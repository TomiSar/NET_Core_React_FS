import { makeAutoObservable, runInAction } from 'mobx';
import { ChatComment } from '../models/comments';
import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
  HubConnectionState,
} from '@microsoft/signalr';
import { store } from './store';

export default class CommentStore {
  comments: ChatComment[] = [];
  hubConnection: HubConnection | null = null;
  loading = false;

  constructor() {
    makeAutoObservable(this);
  }

  createHubConnection = (activityId: string) => {
    if (store.activityStore.selectedActivity) {
      this.hubConnection = new HubConnectionBuilder()
        .withUrl('http://localhost:5000/chat?activityId=' + activityId, {
          accessTokenFactory: () => store.userStore.user?.token as string,
        })
        .withAutomaticReconnect()
        .configureLogging(LogLevel.Information)
        .build();

      this.hubConnection
        .start()
        .then(() => console.log('Connection started'))
        .catch((error) =>
          console.log('Error establishing connection: ', error)
        );

      this.hubConnection.on('LoadComments', (comments: ChatComment[]) => {
        runInAction(() => {
          comments.forEach((comment) => {
            comment.createdAt = new Date(comment.createdAt + 'Z');
          });
          this.comments = comments;
        });
      });

      this.hubConnection.on('ReceiveComment', (comment: ChatComment) => {
        runInAction(() => {
          comment.createdAt = new Date(comment.createdAt);
          this.comments.unshift(comment);
        });
      });
    }
  };

  stopHubConnection = () => {
    this.hubConnection
      ?.stop()
      .then(() => console.log('Connection stopped'))
      .catch((error) => console.log('Error stopping connection: ', error));
  };

  clearComments = () => {
    this.comments = [];
    this.stopHubConnection();
  };

  addComment = async (values: { body: string; activityId?: string }) => {
    values.activityId = store.activityStore.selectedActivity?.id;

    if (this.hubConnection?.state !== HubConnectionState.Connected) {
      console.log(
        'Connection is not in the Connected state. Attempting to reconnect...'
      );
      try {
        await this.startConnection();
      } catch (error) {
        console.error('Error reconnecting:', error);
        return; // Exit if unable to reconnect
      }
    }

    try {
      await this.hubConnection?.invoke('SendComment', values);
    } catch (error) {
      console.log('Error sending comment:', error);
    }
  };

  private startConnection = async () => {
    if (this.hubConnection?.state === HubConnectionState.Disconnected) {
      try {
        await this.hubConnection.start();
        console.log('Connection started successfully.');
      } catch (error) {
        console.error('Error starting connection:', error);
        throw error;
      }
    }
  };
}

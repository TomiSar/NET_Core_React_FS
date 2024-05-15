import { SyntheticEvent, useState } from 'react';
import { Button, Card, Grid, Header, Image, Tab } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { Photo, Profile } from '../../app/models/profile';
import { useStore } from '../../app/stores/store';
import PhotoUploadWidget from '../../app/common/imageUpload/PhotoUploadWidget';

interface Props {
  profile: Profile;
}

export default observer(function ProfilePhotos({ profile }: Props) {
  const {
    profileStore: {
      isCurrentUser,
      uploadPhoto,
      uploading,
      loading,
      setMainPhoto,
      deletePhoto,
    },
  } = useStore();
  const [addPhotoMode, setAddPhotoMode] = useState(false);
  const [target, setTarget] = useState('');

  function handlePhotoUpload(file: Blob) {
    uploadPhoto(file).then(() => setAddPhotoMode(false));
  }

  function handleSetMainPhoto(
    photo: Photo,
    e: SyntheticEvent<HTMLButtonElement>
  ) {
    setTarget(e.currentTarget.name);
    setMainPhoto(photo);
  }

  function handleDeletePhoto(
    photo: Photo,
    e: SyntheticEvent<HTMLButtonElement>
  ) {
    setTarget(e.currentTarget.name);
    deletePhoto(photo);
  }

  return (
    <Tab.Pane>
      <Grid>
        <Grid.Column width={16}>
          <Header icon='image' content='Photos' floated='left' />
          {isCurrentUser && (
            <Button
              style={{ border: '1px solid blue' }}
              floated='right'
              basic
              color='blue'
              content={addPhotoMode ? 'Cancel' : 'Add Photo'}
              onClick={() => setAddPhotoMode(!addPhotoMode)}
            />
          )}
        </Grid.Column>
        <Grid.Column width={16}>
          {addPhotoMode ? (
            <PhotoUploadWidget
              loading={uploading}
              uploadPhoto={handlePhotoUpload}
            />
          ) : (
            <Card.Group itemsPerRow={5}>
              {profile.photos?.map((photo) => (
                <Card key={photo.id}>
                  <Image src={photo.url} />
                  {isCurrentUser && (
                    <Button.Group>
                      <Button
                        basic
                        color='green'
                        content='Main'
                        name={'main' + photo.id}
                        loading={target === 'main' + photo.id && loading}
                        disabled={photo.isMain}
                        onClick={(e) => handleSetMainPhoto(photo, e)}
                      />
                      <Button
                        name={photo.id}
                        loading={loading && photo.id === target}
                        onClick={(e) => handleDeletePhoto(photo, e)}
                        basic
                        color='red'
                        icon='trash'
                        disabled={photo.isMain}
                      />
                    </Button.Group>
                  )}
                </Card>
              ))}
            </Card.Group>
          )}
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
});

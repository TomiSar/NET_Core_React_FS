/* eslint-disable no-constant-condition */
import {
  Button,
  Divider,
  Grid,
  Header,
  Item,
  Reveal,
  Segment,
  Statistic,
} from 'semantic-ui-react';
import { Profile } from '../../app/models/profile';
import { observer } from 'mobx-react-lite';

interface Props {
  profile: Profile;
}

export default observer(function ProfileHeader({ profile }: Props) {
  return (
    <Segment>
      <Grid>
        <Grid.Column width={12}>
          <Item.Group>
            <Item>
              <Item.Image
                avatar
                size='small'
                src={profile.image || '/assets/user.png'}
              />
              <Item.Content verticalAlign='middle'>
                <Header as='h1' content={profile.displayName} />
              </Item.Content>
            </Item>
          </Item.Group>
        </Grid.Column>
        <Grid.Column width={4}>
          <Statistic.Group widths={2}>
            <Statistic label='Followers' value='5' />
            <Statistic label='Following' value='42' />
          </Statistic.Group>
          <Divider />
          <Reveal animated='move'>
            <Reveal.Content style={{ width: '100%' }} visible>
              <Button fluid color='teal' content='Following' />
            </Reveal.Content>
            <Reveal.Content style={{ width: '100%' }} hidden>
              <Button
                fluid
                basic
                color={true ? 'red' : 'green'}
                content={true ? 'Unfollow' : 'Follow'}
              />
            </Reveal.Content>
          </Reveal>
        </Grid.Column>
      </Grid>
    </Segment>
  );
});

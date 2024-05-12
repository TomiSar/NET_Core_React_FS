import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Header, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';
import { Activity } from '../../../app/models/activity';
import { v4 as uuid } from 'uuid';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { categoryOptions } from '../../../app/common/options/categoryOptions';
import MyTextInput from '../../../app/common/form/MyTextInput';
import MyTextArea from '../../../app/common/form/MyTextArea';
import MySelectInput from '../../../app/common/form/MySelectInput';
import MyDateInput from '../../../app/common/form/MyDateInput';

export default observer(function ActivityForm() {
  const { activityStore } = useStore();
  const {
    loadActivity,
    createActivity,
    updateActivity,
    loading,
    loadingInitial,
  } = activityStore;
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [activity, setActivity] = useState<Activity>({
    id: '',
    title: '',
    date: null,
    description: '',
    category: '',
    city: '',
    venue: '',
  });

  const validationSchema = Yup.object({
    title: Yup.string().required('The activity title is required'),
    date: Yup.string().required('The activity date is required'),
    description: Yup.string().required('The activity description is required'),
    category: Yup.string().required(),
    city: Yup.string().required(),
    venue: Yup.string().required(),
  });

  useEffect(() => {
    if (id) loadActivity(id).then((activity) => setActivity(activity!));
  }, [id, loadActivity]);

  function handleFormSubmit(activity: Activity) {
    if (!activity.id) {
      const newActivity = {
        ...activity,
        id: uuid(),
      };
      createActivity(newActivity).then(() =>
        navigate(`/activities/${activity.id}`)
      );
    } else {
      updateActivity(activity).then(() =>
        navigate(`/activities/${activity.id}`)
      );
    }
  }

  if (loadingInitial) return <LoadingComponent content='Loading activity...' />;

  return (
    <Segment clearing>
      <Header content='Activity Details' sub color='teal' />
      <Formik
        validationSchema={validationSchema}
        enableReinitialize
        initialValues={activity}
        onSubmit={(values) => handleFormSubmit(values)}
      >
        {({ handleSubmit, isValid, isSubmitting, dirty }) => (
          <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
            <MyTextInput name='title' placeholder='Title' />
            <MyTextArea name='description' placeholder='Description' rows={3} />
            <MySelectInput
              name='category'
              placeholder='Category'
              options={categoryOptions}
            />
            <MyDateInput
              name='date'
              placeholderText='Date'
              showTimeSelect
              timeCaption='time'
              dateFormat='MMMM d, yyyy h:mm, aa'
            />
            <Header content='Location Details' sub color='teal' />
            <MyTextInput name='city' placeholder='City' />
            <MyTextInput name='venue' placeholder='Venue' />
            <Button
              disabled={isSubmitting || !dirty || !isValid}
              floated='right'
              positive
              type='submit'
              content='Submit'
              loading={loading}
            />
            <Button
              as={Link}
              to='/activities'
              floated='right'
              type='button'
              content='Cancel'
            />
          </Form>
        )}
      </Formik>
    </Segment>
  );
});

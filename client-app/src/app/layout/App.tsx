import React, { useEffect, useState } from 'react';
import { Container } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import {v4 as uuid} from 'uuid';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';

function App() {
  const {activityStore} = useStore();

  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  const [submiting, setSubmiting] = useState(false);

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore])

  function handleSelectedActivity(id: string){
    setSelectedActivity(activities.find(x => x.id === id));
  }

  function handleCancelSelectActivity(){
    setSelectedActivity(undefined);
  }

  function handleFormOpen(id?: string){
    id ? handleSelectedActivity(id) : handleCancelSelectActivity();
    setEditMode(true);
  }

  function handleFormClose() {
    setEditMode(false);
  }

  function handleCreateOrEditActivity(activity: Activity){
    setSubmiting(true);
    if(activity.id){
      agent.Activities.update(activity).then(() => {
        setActivities([...activities.filter(x => x.id !== activity.id), activity])
        setSelectedActivity(activity);
        setEditMode(false);
        setSubmiting(false);
      })
    } else {
      activity.id = uuid();
      agent.Activities.create(activity).then(() => {
        setActivities([...activities, activity])
        setSelectedActivity(activity);
        setEditMode(false);
        setSubmiting(false);
      })
    }
  }

  function handleDeleteActivity(id: string) {
    setSubmiting(true);
    agent.Activities.delete(id).then(() => {
      setActivities([...activities.filter(x => x.id !== id)])
      setSubmiting(false);
    })
    
  }

  if(activityStore.loadingInitial) return <LoadingComponent content='Loading app' />

  return (
    <>
        <NavBar openForm={handleFormOpen} />
        <Container style={{marginTop: '7em'}}>

          <ActivityDashboard 
                              activities={activityStore.activities} 
                              selectedActivity={selectedActivity}
                              selectActivity={handleSelectedActivity}
                              cancelSelectActivity={handleCancelSelectActivity}
                              editMode={editMode}
                              openForm={handleFormOpen}
                              closeForm={handleFormClose}
                              createOrEdit={handleCreateOrEditActivity}
                              deleteActivity={handleDeleteActivity}
                              submiting={submiting}
          />
        </Container>
    </>
  );
}

export default observer(App);
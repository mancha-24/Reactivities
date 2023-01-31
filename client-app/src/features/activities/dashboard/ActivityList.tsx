import { observer } from "mobx-react-lite";
import { Fragment } from "react";
import { Header, Item, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import ActivityListItem from "./ActivityListItem";

export default observer(function ActivityList() {
    const {activityStore} = useStore();
    const {gruopedActivities} = activityStore;

    return (
        <>
            {gruopedActivities.map(([group, activities]) => (
                <Fragment key={group}>
                    <Header sub color='teal'>
                        {group}
                    </Header>
                    <Segment>
                        <Item.Group divaded>
                            {
                                activities.map(activity => (
                                    <ActivityListItem key={activity.id} activity={activity}/>
                                ))
                            }
                        </Item.Group>
                    </Segment>
                </Fragment>
            ))}
        </>
        
    )
})
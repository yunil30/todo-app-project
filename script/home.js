   //Model Section
   let myActivities;

   const savedActivity = JSON.parse(localStorage.getItem('myActivities'));

   if(Array.isArray(savedActivity)) {
       myActivities = savedActivity;
   } else {
       myActivities = [{
           myActivity: 'Computer class',
           dueDate: '2022-10-04',
           activityId: 'id1'
       }];
   }

   //This function is used to create an activity.
   function createActivity(myActivity, dueDate) {
       const activityId = '' + new Date().getTime();
       myActivities.push({
           myActivity: myActivity,
           dueDate: dueDate,
           activityId: activityId
       });
       saveActivity();
   }

   //This function is used to remove an activity.
   function removeActivity(idtoDelete) {
       myActivities = myActivities.filter(function (activity) {
           if (activity.activityId === idtoDelete){
               return false;
           } else {
               return true;
           }
       });  
       saveActivity();
   }
   
   //This function is used to save the activity.
   function saveActivity(){
       localStorage.setItem('myActivities', JSON.stringify(myActivities));
   }

   //Controller Section
   function addActivity() {
       const textbox = document.getElementById('activity-Title');
       const myActivity = textbox.value;

       const activityDate = document.getElementById('activity-Date');
       const dueDate = activityDate.value;

       createActivity(myActivity, dueDate);
       render();
   }

   function deleteActivity(event) {
       const deleteButton = event.target;
       const idtoDelete = deleteButton.activityId;

       removeActivity(idtoDelete);
       render();
   }

   //View Section
   function render() {

       document.getElementById('activity-List').innerHTML = ' ';

       myActivities.forEach(function (activity){
            const element = document.createElement('div');
            element.innerText = activity.myActivity + '\n' + 'Date: ' + activity.dueDate;
            element.classList = 'my-activity1';
            // These codes are used to create the delete button element inside the html.
            const deleteButton = document.createElement('button');
            deleteButton.innerText = 'Delete';
            deleteButton.classList = 'delete-button';
            deleteButton.onclick = deleteActivity;
            deleteButton.activityId = activity.activityId;
            element.appendChild(deleteButton);

            const activityList = document.getElementById('activity-List');
            activityList.appendChild(element);
       });
   }

   render();
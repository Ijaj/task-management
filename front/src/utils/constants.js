const hours = 24;
const millisecondsInAnHour = 60 * 60 * 1000;
export const ttk = hours * millisecondsInAnHour;

export const taskCategories = [
  { value: 'arts_and_crafts', label: 'Arts and Crafts' },
  { value: 'nature', label: 'Nature' },
  { value: 'family', label: 'Family' },
  { value: 'sport', label: 'Sport' },
  { value: 'friends', label: 'Friends' },
  { value: 'meditation', label: 'Meditation' }
];

export const statuses = [
  // { value: 'all_tasks', label: 'All Tasks' },
  { value: 'ongoing', label: 'Ongoing' },
  { value: 'pending', label: 'Pending' },
  { value: 'collaborative_task', label: 'Collaborative Task' },
  { value: 'done', label: 'Done' }
];
# Refreshing in a /rooms/$id chatroom page breaks the below:
- the components ngOnDestroy() function, which stops the removal of the current member from the rooms' members list.

# If a room is deleted in the rooms list, any users in the room will receive errors.


# Refreshing in a /rooms/$id chatroom page breaks the below:
- the components ngOnDestroy() function, which stops the removal of the current member from the rooms' members list.

# Using native browser navigation such as swipe back or forwards with phone, tends to break things.

# If a room is deleted in the rooms list, any users in the room will receive errors.


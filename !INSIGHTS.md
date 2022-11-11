# Features that were not implemented but thought of
- Members list UI in a chatroom page, displaying users active in the chatroom.
- Profile page allowing for the editing of a users account.
- System messages in the chatroom, notifying when users join, leave a chatroom.
- ??If spinner has been detected for more thatn 10 seconds, display error? there might be a better implementation of this.
- detect 2 minute inactivity, disable listener. Kick User/Disable chat, users will have to refresh chat with button.


# Hindsight: Implementing detection of inactivity and disabling the onSnapShot subscription listeners
Due to the fact that the "unsubscribe" functions are not stored in a global scope, it is
difficult to stop it from anywhere, which would be incredible convenient, also it would
help with completely getting rid of ALL currently live onSnapShot listeners too, because
they're all consolidated in one place.

Example of implementation, on the SingletonService have a class property called, 
"subscriptions: {
    "roomId#1": {
        "roomsMessagesSubscription": unsubscribeFuncSavedHere()
    }, 
    "roomId#2": {
        "roomsMessagesSubscription": unsubscribeFuncSavedHere()
    }, 
    "roomIndex": {
        "roomsListSubscription": unsubscribeFuncSavedHere()
    }
}"

# More services!
services like:
- ModalService: that can be accessed from any component allowing for the manipulation and generation of a modal.
- ToastService: ...generation of a toast prompt
- ActivityService: that keeps track of inactivity, and can be accessed from any component, kick user for example.
- LoadingService: allows for the disabling of page, and showing a spinner, from whatever component. (Example of usage, sometimes the server is slow to return a message, so users will end up sending a message and no change will happen in the chatroom.)
- RoomsService: should have the joinRoom and leaveRoom here. So you can activate these anywhere. This would make things way easier for other features i had thought of easier to have done/do.



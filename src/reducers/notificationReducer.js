const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case "notification/setNotification":
      return action.payload
    case "notification/removeNotification":
      return null
    default:
      return state
  }
}

export const setNotification = (category, message, delay) => {
  return {
    type: "notification/setNotification",
    payload: {
      category,
      message,
      delay
    }
  }
}

export const removeNotification = () => {
  return {
    type: "notification/removeNotification"
  }
}

export default notificationReducer
import React, { useEffect } from 'react'

const Alert = ({alerts,ManageAlerts,itemArray}) => {

  useEffect(() =>{
   const alert_timeout = setTimeout(() => {
      ManageAlerts()
    }, 2000);
    return () => clearTimeout(alert_timeout);
  }, [itemArray])
  return (
   <div style={{color:alerts.type === "Success" ? "green" : "red"}}>
    {alerts.message}
   </div>
  )
}

export default Alert
import React from "react";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

export const AlertContext = React.createContext();

export const AlertProvider = ({ children }) => {
  const [alert, setAlert] = React.useState(null);
  const MySwal = withReactContent(Swal);

  React.useEffect(() => {
    if (alert) {
      MySwal.fire(alert);
      setAlert(null);
    }
  }, [alert, MySwal]);

  return (
    <AlertContext.Provider value={{ alert, setAlert }}>
      {children}
    </AlertContext.Provider>
  );
};

// Only TL, PM, HR can access the jobRequest Table 
export const JrLevelMessage = ({ rId, jrLvl }) => {
  let message;

  if (rId == 'TL') {
    switch (jrLvl) {
      case 0:
        message = ("Handled by PM");
        break;
      case 1:
        message = ("Forwarded to HR");
        break;
      case 2:
        message = ("Job Request fulfilled!");
        break;
    }
  } else if (rId == 'PM') {
    switch (jrLvl) {
      case 0:
        message = ("New Request!");
        break;
      case 1:
        message = ("Forwarded to HR");
        break;
      case 2:
        message = ("Job Request fulfilled!");
        break;
    }
  } else if (rId == 'HR') {
    switch (jrLvl) {
      case 1:
        message = ("New Request!");
        break;
      case 2:
        message = ("Job Request fulfilled!");
        break;
    }
  }

  return (
    <div>
      {message}
    </div>
  )
};

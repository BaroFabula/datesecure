# datesecure

The webbrowsers Internet Explorer and Safari do not support the date and time input types (https://caniuse.com/#feat=input-datetime). So the user has an input, where he can enter any text. This script limits the possible input of there fields to valid date (DD.MM.YYYY) and time (HH:MM). The current version supports just these date and time formats.

In blur the script checks the input of the field. If the input isn't in the correct format, the input is cleared and still focussed. If the input is empty or filled in the correct format, the cursor and focus can leave the input.

## Usage

To add and enable the script you have just to add it as script to you html-Website:

    <script src="timeDateCover.js" type="application/javascript"></script>


You can define in a previous script the variables popup, datePopup and timePopup to add a Popupmessages on false input:

    <script type="application/javascript">
      popup = true;
      datePopup = "InvalidDate";
      timePopup = "InvalidTime";
    </script>
    <script src="timeDateCover.js" type="application/javascript"></script>

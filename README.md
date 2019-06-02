### Email Sheets Table
A Google Apps Script program to email tables from a Google Sheets file.

##### Instructions: 
1. In a Google Sheets file, go to Tools --> Script Editor. 
2. Copy and paste the Email_Sheets_Table.gs file, removing any default functions that are already in the document. Save the document, and title it whatever you like. 
3. For variables tableRange through cc, enter your information, following the instructions in the file.
4. In the toolbar near the top of the page, select the "sendEmails" function, and press the play button to its left. <sup>1</sup>
5. Congratulations, the email has now been sent out! If this data changes regularly, and you would like to send it out on a regular schedule, continue. If not, the process is now complete!
6. Go to Edit --> Current Project's Triggers.
7. Click Create a New Trigger. 
8. Under "Choose which function to run", select sendEmails. 
9. Under "Select event source", select Time-driven.
10. "Select type of time based trigger" and "Select hour interval" will appear. With these, you can now specifify when you would like the function to run, and how often! 
11. Click Save. The spreadsheet you specified in the App Script will now be sent on the schedule chosen in step 10. 

<sup>1</sup> You will likely be prompted to give the program permission to send an email as you, and to edit your spreadsheets; please note that this program does not feature the capability to edit your spreadsheets, only to send them in an email from your alias.

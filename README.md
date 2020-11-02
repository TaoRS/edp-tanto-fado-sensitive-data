EDP Tanto Fado
-

EDP Tanto Fado is an event organized in Portugal by [EDP](https://www.edp.pt/) in 2020 for Fado artists.

Event: [EDP Tanto Fado](https://portugal.edp.com/pt-pt/edptantofado)

This is a small script that takes advantage of EDP's PUBLIC API to get personal and sensitive information about the registered (approved and rejected) candidates.

Data available:

- Name
- Email
- Phone number
- Nationality
- Location
- Occupation (inside the members property; for some cases)
- A relative's name
- Biography
- and others

I do think that this information allows for any creative scammer to be able to at least try to scam these people.

----


I have written this as a challenge for me to get a list of the most voted artists (and learn a bit of node).
Then I realised how much information I'm getting and I really think that this can be a problem. 

I'm not sure if EDP is breaking any GDPR laws here, and is not my place to judge that.

------
----


How to use
-

You need nodeJS in order to run this.

1. Clone the repo
2. Run `npm install`
3. Run `npm run votes`
4. The files will be available at `.files/` directory


-----
----

How it works
---

The script will loop trough the available candidates, retrieve the information and save it to a CSV and JSON file in a folder called `files`. It will take a few seconds.

Since I don't know how many candidates are registered, at the time of writting, I've set a number of 225 requests by default. Feel free to change this number in the future.

Issues
--
If I input a higher number, sometimes the connection gets refused with a `ECONNRESET` error. I'm not knowledgeable enough to be able to fix it, sorry.

If it does happen to you, try again or input a different number for `max` on `line 5` of the `votes.js` file.
 
---
I'm not making any files available. So, if they fix it, the script will be broken and you will lose the ability to see the information. And I want to keep it that way.

I don't think this information should be public in the first place.
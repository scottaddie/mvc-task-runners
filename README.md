# mvc-task-runners
A sample ASP.NET 5 application to accompany my September 8th WI .NET Users Group presentation. This application demonstrates the use of Gulp with MVC 6.

##Project Setup
These setup instructions assume that you have Visual Studio 2015 installed. If not installed, then refer to the instructions [here](https://github.com/aspnet/home/#upgrading-dnvm-or-running-without-visual-studio) to install the .NET Version Manager (DNVM).

1. Install Node.js with NPM.
2. Install the local project's NPM packages as follows:
  `npm install`
3. Restore/install the NuGet packages listed in project.json as follows:
  `dnu restore`. If the "dnu" command is not recognized, then first try executing this command:
`dnvm upgrade`.
4. Navigate to the project directory ("mvc-task-runners"), and run the following command:
  `dnx . web`.
  Note the localhost address printed to the console.
5. Navigate to the aforementioned localhost address in your browser of choice. Typically, the localhost address is something like "http://localhost:5000".

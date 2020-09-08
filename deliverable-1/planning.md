# Tokyo Toilets
## Product Details

#### Q1: What are you planning to build?

 *Tokyo Toilets crowd sources toilet accessibility information for visitors to Japan.*

 Toilet culture in Japan is very different than it is in North America. Toilets in Japan are known for their immaculate cleanliness, and high functioning capabilities. Most modern toilets include various customizable settings, however without translations the buttons can be intimidating.

  Additionally, there exist many "squatting" toilets, even in urban areas. These toilets would be foreign to anyone who has not traveled outside North America. 

   ![](https://sociorocketnewsen.files.wordpress.com/2015/01/2015-01-17-toilets-4.jpg?w=200&h=200)
   ![](https://sociorocketnewsen.files.wordpress.com/2015/01/2015-01-17-toilets-ilastuo.jpg?w=250&h=200)

  Toilets exist in many public spaces, and they take various forms. Some toilets are suitable for a disabled person while others are not. Some toilets are urinal-only, or squatting-only. 

  One place where toilets are commonly found are [convenience stores](http://www.bbc.com/travel/story/20190610-the-unique-culture-of-japanese-convenience-stores). In Tokyo you are usually within a 2 minute radius of a convenience store. However, the accessibility and hours of these toilets vary from store to store. 

  ![](https://rimage.gnst.jp/livejapan.com/public/article/detail/a/00/02/a0002218/img/en/a0002218_parts_5ad809a3258cc.jpg?20180801200603&q=80&rw=686&rh=490)


The problem domain is that going to the bathroom in a foreign country can be intimidating for multiple reasons. Some of these reasons include: 

- Being uncomfortable with signs/toilet buttons without english translations
- Having specific toilet accessibility needs due to a disability
- Requiring a baby change station for your child
- Not knowing how to use a specific toilet, or how to keep a toilet clean

 Our product is a web application intended to be used on mobile browsers.
 Our product will address the above issues by including toilet tutorials, as well as a crowd-sourced mapping of toilets in Tokyo (with specific toilet information and helpful search filters).


#### Q2: Who are your target users?

   Our target users are foreigners who are in Japan for any length of time. Our target users do not know Japanese, and they are unfamiliar with Japanese culture. Some of our target users have toilet accessibility needs, such as being disabled or requiring a baby change station. Some of our target users just need to find the closest bathroom available. 

   - Priya is on exchange from Philadelphia at Temple University in Tokyo. She has IBS and is nervous about promptly finding toilets in a foreign country.

   - Dave has a layover in Tokyo, and is used to a single pump, one-function North American toilet. Upon using a seated Japanese toilet at the airport, he is overwhelmed by the various buttons/functions and almost misses his flight.

   - Manjeet is traveling Tokyo as a new mother with an infant child. She needs to find a baby change station quickly in a crowded area. 

   - Ashante is traveling as a tourist with her elderly mother who is in a wheelchair. Ashante wants to show her mother the beauty of the Japanese countryside, but is worried about traveling too far from urban areas, since finding wheelchair accessible toilets might be more difficult.

   - Clint flies from Colorado to visit his girlfriend in Tokyo, and on their first night out together he is faced with a "squatting-style" toilet that he is unaware existed until that moment.


#### Q3: Why would your users choose your product? What are they using today to solve their problem/need?

Tokyo Toilets is comprised of two main features:

**Feature 1: Toilet Tutorial**

The purpose of this feature is to demystify toilets for our users. Many Japanese tourism sites will include information about toilets, including their etiquette and what the different buttons do. However, these websites are difficult to navigate and often contain incomplete information. Here are some examples of existing toilet guides: 

[Example1](https://wow-j.com/en/Allguides/other/tips_manners/00999_en/#1)<br> [Example2](https://www.japan-talk.com/jt/new/7-things-you-need-to-know-before-using-a-toilet-in-Japan)<br> [Example3](https://matcha-jp.com/en/756)

While the information is useful, it is not in a digestible format on a mobile phone. Additionally, these are blog posts on tourism websites which happen to be dated and have a less-than-ideal user experience.

The toilet tutorial will be interactive, and help people who are unfamiliar with electronic toilets learn what the buttons do. The tutorial will also include how to use a squatting toilet, and how to clean up/dispose of waste properly. This feature is perfect for people who are new to Japan, and have not done prior research about traveling.

**Feature 2: Toilet Tracking**

You don't know you need a toilet until you really need one. This is the primary function of Tokyo Toilets, to help users find the closest bathroom that suits their needs. Some toilets will already exist in our database, and will appear on the map and in search results. Users will be able to see the closest toilets to them on a map, and be able to filter search results to match their needs. This addresses the problem of people needing specific toilets. Once a user is logged in, they will have the ability to place a toilet. This is the "crowd-sourcing" aspect of our application, and with every new toilet placed our system improves. 

**Other Toilet apps**

[Existing application 1](https://apps.apple.com/jp/app/check-a-toilet-for-iphone/id371963398)<br>
[Existing application 2](https://apps.apple.com/jp/app/%E3%83%88%E3%82%A4%E3%83%AC%E6%83%85%E5%A0%B1%E5%85%B1%E6%9C%89%E3%83%9E%E3%83%83%E3%83%97%E3%81%8F%E3%82%93/id1054294308)


 The above apps existing tell us two things. That our market is valid and our problem is real, since there are people actively trying to solve this problem. Both these apps are inaccessible to foreigners, as they do not support languages other than Japanese. Additionally, they don't include how to use different toilets. Generally their interface is stale and their user experience is laggy.

 After reading the english app reviews, it seemed like tourists were often led to a restaurant or another space that was not "technically" a **public** bathroom, but was marked as such by other users. Our application will include filters for "semi-private" spaces such as restaurants, gated parks, etc. since these toilets are still valid, however may be inaccessible to some people because of language barrier. 


#### Q4: How will you build it?

- Stack
  - TypeScript, React (`create-react-app`, `react-intl` for translations), Node.js, Express, MongoDB (Mongoose for ORM). This stack was chosen because we both have experience using these technologies with JavaScript.
  - Using a document database gives a lot of flexibility, and we anticipate that data stored will not be overly relational. An ORM like Mongoose abstracts DB interaction and adds convenient funtionality during development.
  - TypeScript was chosen because type safety over JavaScript can eliminate many bugs, and increases developer comprehension in a collaborative project (as well as this being a good learning opportunity).
  - Diagram of architecture: ![](/Users/jg/projects/team-project-5-tokyo-toilets/deliverable-1/res/architecture.png)
- APIs
  - [Mapbox](https://www.mapbox.com/) for plotting toilet locations and information, because it is more customizable, allows turn by turn directions, has offline maps available that we could leverage in the future, and overall better suited to our use case than Google Maps.
- Testing
  - Jest framework (backend & frontend), due to simplicity, easy mocking, and coverage reports.
- Deployment
  - Heroku, automated build process using GitHub Actions to run Jest test suite on pushes or merges to master, and trigger deploy on success. Heroku provides good GitHub integration, and is very straightforward to use for this type of app.
  - Deployment flow diagram:![](/Users/jg/projects/team-project-5-tokyo-toilets/deliverable-1/res/deployment.png)

#### Q5: What are the user stories that make up the MVP?

Acceptance criteria are in bullets nested below each story. We have no partner for this project.

1. As an exchange student with digestive issues, Priya wants to be able to quickly find and use the nearest public toilet so that the time between me realizing she needs it and using it is minimized.
   - The app must not necessarily send her to the closest toilet, but to the one with the lowest travel + wait time e.g. choose a quiet washroom 5 minutes away over a typically busier one with lines across the street.
   - The toilet recommended must be available for unconditional public use i.e. no purchases or memberships required.
2. As a foreigner on a very short visit to Japan, Dave wants to be able to easily understand the features available on the airport toilet he encountered so that he can enjoy the experience and not lose time fiddling with it.
   - The tutorials must be clear, and present a way for users to identify what type of toilet they have.
   - The tutorials must provide translations of the kanji and kana / explanations of typical buttons and their features with images.
3. As a parent with a baby in diapers, Manjeet wants to find a washroom with a baby changing station so that she can safely clean and change her child.
   - Manjeet must have a way to specify or filter results to choose toilets that have the desired amenity
   - All recommended toilets must adhere to the user filter, e.g. in this case, they must all have changing stations.
4. As an acting caretaker for someone in a wheelchair, Ashante wants to know where, if any, the wheelchair accessible washrooms are in more rural areas ahead of time, so that she can plan her trip with her mom.
   - She must be able to filter recommended toilets such that they are all wheelchair accessible.
   - There must be a map that plots all locations of recommended and filtered toilets ahead of time, and is able to be dragged or have the view changed to user defined locations.
5. As a foreigner who has only encountered western-style toilets, Clint wants to simply understand how to use the squat style toilet that he now faces, so that he can try to use it without making a mess.
   - The tutorials must be clear, and present a way for users to identify what type of toilet they have.
   - There should be at least a detailed explanation on physially using squat toilets, preferably accompanied by animated graphics, images, or videos.

----

## Process Details

#### Q6: What are the roles & responsibilities on the team?

Because our team is very small, just two rather than the 4-6 typical members, we decided that it doesn't make as much sense to have clearly defined roles. Especially since we both have comparable experience across the stack, it is easier for us both to take and complete tasks as they come.

However, since Kabir has had personal experience with this problem, and has done research over a longer period of time, it makes sense for him to have a larger share of the produt owner type of role.

Since there is no partner associated with this project, we will not have any notetaking or organization relation type roles.

1. Javan Graham
   - Roles
     - General development (full stack, stronger with back end), help setting up infrastructure and build pipelines, writing documentation, take part in managing project board.
   - Strengths
     - Worked with chosen stack (and full stack web in general with other frameworks) before.
     - Very independent, can take vague concepts or requirements and turn into features.
     - Familiar with Kanban, and project management concepts.
   - Weaknesses
     - Have never written or interacted with tests on the front end.
     - Have never employed "mobile first" web design, or writing properly responsive interfaces.
     - Estimating accurate deadlines.
2. Kabir Virji
   - Roles
     - General development, setting up infrastructure and build pipelines, writing documentation, take part in managing project board, as well as ensuring integrity of the product.
   - Strengths
     - JavaScript, React, Node 
   - Weaknesses
     - C, C++, Go

#### Q7: What operational events will you have as a team?

Due to having no partner, we have no partner meetings scheduled. Because we have chosen to base our process off of Kanban, there are not as many mandatory rituals as there are using Scrum. We find that the overhead of that framework will not be benecifial when managing such a small group. 

Being just a pair, it would be very easy to just communicate as needed over Slack throughout the duration of the project. Since we both have professional experience, we should be able to operate in parallel fairly independently, and things like code reviews will just be performed ad hoc.

At the most we can have an online meeting during or after tutorial just so that there is time set aside to discuss things verbally if necessary or to work out the design of a component in more detail and agree on implementation, but since we are planning to rely on Slack and other asynchronous text based forms of communication, it may not be necessary.

Also, it may not be required to have a meeting, but at the least we can partition our development efforts into blocks segmented by the deliverable due dates, and after each date, it would be helpful to perform a type of retrospective. We can evaluate our progress, what went well and what didn't, what work we will carry over, and also evaluate our process itself, and see how we can tweak it to improve produtivity.

#### Q8: What artifacts will you use to self-organize?

In order to keep the ecosystem simple and avoid using too many different services, we will use a Kanban board via the projects tab of the GitHub repository, with automated integration with Issues, to organize and track the status of tasks. Aside from the typical "backlog, progress, done",  we may add a few extra if necessary, to denote if a ticket is "complete" but being reviewed, or if it is deployed, but just in staging, for example.

We may also keep an independent schedule somehow so that we can ensure that we are on track for the features required for each upcoming deliverable. This way, the status of work throughout the "release" can be tracked at a more granular level using the Kanban board, and features tracked at a higher level using our schedule or even an artifact like a burndown chart.

Tasks will be prioritized according to their necessity, based on how important they are to building the MVP, and whether they lead to implementing strict requirements, or are just nice-to-haves. Additionally, tasks are prioritized by the aforementioned deliverable schedule, as well as sequentially e.g. the task for making the React app will be higher priority than adding a map to the main view.

Task assignment will be mostly voluntary. Some key tasks should be consensually assigned upon creation (possibly during deliverable retro/planning talks) to ensure ownership and fairness, while other (smaller) tasks are left unassigned initially, and whoever is available can take them on. This approach is possible because of our comparable skill sets and experience.

#### Q9: What are the rules regarding how your team works?

As implied in the previous sections, working culture is very laid-back on this team.

**Communications:**

Expected frequency of communication is at minimum once per week, during/after tutorials, however there will be smaller discussions taking place over Slack at a higher frequency during development.

**Meetings:**

Regarding any internal meetings, since there are only two of us we would have to self moderate, and make sure that we follow through on any agreed upon plans.

**Conflict Resolution:**

1. Disagreement on technical decision
   - Understand reasoning behind both opinions, try to be rational and side with situationally best decision, either with compromise, or choosing one over the other rationally.
2. Unresponsive partner
   - Not much room to rebalance tasks on small team, just continue to attempt communication, and at a certain point invoke authority (TA/Prof).
3. Partner not meeting deadlines
   - See whether there is lack of interest in piece of work, technical problems / inexperience leading to delay, or other personal setback.
   - Try to adjust work better suited to struggling member's strengths.

----
### Highlights

All of these discussions below took place either over Slack or during a breakout from lecture or tutorial.

- Deciding to have toilet recommendation system have configurable
  - Initially we thought that it would make sense for users to just be recommendedd the nearest toilets that match their criteria, but we found that when writing the user stories, this metric alone would not produce satisfactory results for all cases.
  - For example, if an able-bodied adult is travelling on foot alone and not facing any emergency, the nearest toilet would be the most convenient, a lineup wouldn't be an issue. But for someone with children or with digestive or other issues, we would need to factor in wait times and traffic in order to get them from current location to actually using the toilet the fastest.
- Deciding to use TypeScript over JavaScript
  - Like mentioned above, this decision occurred when discussing the stack. We both have worked with and are comfortable writing JavaScript and wanted to expand our knowledge by using TypeScript. There are certain technical issues in JS that are addressed, and we would like to take this as a learning opportunity.
- Deciding to make sure the program is internationalized
  - Once again, another issue brought to our attention when working on the stories. Tokyo is a very international city, but Japanese is not the most international language. Many potential users may not even be fluent in English either, and would be most comfortable using the app (and reading tutorials / translated content) in their native language.
  - Another scenario we bounced around was an event that drew international crowds to Japan, like the Olympics. Many foreigners, who may not read English or Japanese well, would be going there and potentially facing conflict with toilet access and usage.
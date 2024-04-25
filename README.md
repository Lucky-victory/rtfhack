
# GreenspaceDAO x Ready to Fight Hack

Video Demo - [Demo video](https://www.loom.com/share/830b631d4e7b4a4d887ec28fd148f2ae) <br />
Live Link - [GreenspaceDAO dapp](https://greenspacedao.xyz/) <br />
Pitch Deck - [Figma slides](https://www.figma.com/proto/kbNH39bNAHi5LMqBysGlHD/GreenSpaceDAO-Pitch-Deck?page-id=0%3A1&type=design&node-id=0-185&viewport=401%2C401%2C0.05&t=T8YMxu888hhtmNQn-8&scaling=scale-down-width&hide-ui=1) <br/>

## ✨ Description

[GreenspaceDAO](https://greenspacedao.xyz/) is the first community blockchain based project powered by community and built for community to promote healthy living and achieve healthy locations where people live up to a 100 years all around the world. We are trying to make sure people live healthy by incorporating healthy living habits into their lifestyle and trying to make living healthy fun again by introducing community inclusive programs like weekly challenges where people can even try to compete against each other on a leaderboard, events, video call sessions with certified nutritionists and incentivizing these nutritionists as a focal point, to improve health, productivity and making our members live happier, more fulfilled lives with a sense of purpose and belonging in their community. 

Think of what we're building as AA for longevity, it's not just about wanting to live longer but having a roadmap, a mission and a group to journey with and be accountable to. 

## Inspiration

People are becoming obsessed with living longer, but they don't know how, they are spending so much money on drugs and supplements, but are they really doing it correctly? We don't think so, so that's why we at GreenspaceDAO have come up with this idea to focus on nutrition and longevity. What if we can create communities that are focused on living up to 100 years.

## What we built

Our features empower personal healthy living habits by:

- Allowing users to setup meetings with nutritionists who would offer professional consultation to them.
- Providing educative articles that can inspire users to live healthier lives.
- Providing educative meal and fitness plans that paid subscribers have access to.
- Users can interact with each other in our communities and work on health goals/challenges together.
- Users can set up in real life events in communities and meet up and do healthy activities together like long walks, marathons etc.
- AI Coach
- Weekly community sessions with nutritionists and accountability sessions

## 💻 How we built GreenspaceDAO

Here's a breakdown of how it was built:

1. Users can sign up with the `init_user` function, which they will pay the subscription fee and then get onboarded into our platform to enjoy our services

2. Nutritionists can sign up with the `init_nutritionist_applicant` function, which they will pass their credentials into and have their application status set to pending.

3. We will then see their application status, and after verifying their credentials and see that it's legitimate we can now approve their status by calling the `approve_nutritionist_application` function, which will approve the nutritionists and set their application status as accepted, and they can now be onboarded into our platform.

5. When a user's subscription expires, their subscription status automatically expires and their access to our platform gets revoked and their user NFT gets burned automatically, this functionality will be enabled by clockwork automation which calls the `end_user_subscription` function when their deadline elapses, they still remain members of our platform just that they can't access our services until they renew their subscription and they can now mint another user NFT

6. Users can join communities and chat in these communities, the chat feature is powered by socket, there are also ongoing challenges and events going on in communities.

7. Our calling feature is powered by huddle01

## Where we deployed to/contract details

We created and deployed our smart contracts on the Ready to Fight Chain.

### Ready to Fight Chain

GreenspaceDAO program - 3oAwHdjpEYojMcTe5qvSTFPWM5voXm7AMXrXxD4cfJLF - [View on Ready to Fight Chain](https://explorer.solana.com/address/3oAwHdjpEYojMcTe5qvSTFPWM5voXm7AMXrXxD4cfJLF?cluster=devnet)



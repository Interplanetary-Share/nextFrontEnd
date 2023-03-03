export const randomWIPMsg = () => {
  const wipMsgs = [
    'Oopsie! This feature is still in the works and not quite ready for prime time.',
    "This feature is like a cake that's still baking in the oven - it needs a little more time before it's ready.",
    "We're still polishing up this feature to make it shine like a diamond. Hang tight!",
    'Not to worry, this feature is just taking a brief hiatus to prepare for its big debut.',
    "This feature is currently in the cocoon stage - it'll emerge as a beautiful butterfly soon enough!",
    "Sorry, this feature is still marinating in its own awesomeness. It'll be ready to serve up shortly!",
    "This feature is currently in the process of being born - it'll be ready to go in no time!",
    "Like a good wine, this feature needs time to mature. We'll uncork it when it's ready.",
    "This feature is currently undergoing some serious ninja training. It'll be back soon, stronger than ever.",
    "We're still ironing out the kinks in this feature, but don't worry - we have plenty of fabric softener.",
    "This feature is still a work in progress, but we promise it's going to be epic when it's finished!",
  ];

  const randomMsg = wipMsgs[Math.floor(Math.random() * wipMsgs.length)];

  return randomMsg;
};

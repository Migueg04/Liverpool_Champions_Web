  LottieInteractivity.create({
    player: '#SLOTXI',
    mode: 'cursor',
    actions: [
      {
          type: "hold"
      }
    ]
  });

  LottieInteractivity.create({
    player: '#Stats',
    mode: 'scroll',
    actions: [
      {
          visibility: [0, 1],
          type: "loop",
          frames: [0, 550]
      }
    ]
  });


  LottieInteractivity.create({
    player: "#MyWords",
    mode:"scroll",
    actions: [
      {
        visibility: [0.50, 1.0],
        type: "play"
      }
    ]
  });


  LottieInteractivity.create({
    player: '#Paralaje',
    mode: 'scroll',
    actions: [
      {
        visibility: [0,1],
        type: 'seek',
        frames: [-40, 130],
      },
    ]
  });


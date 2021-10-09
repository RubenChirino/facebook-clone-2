// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  res.status(200).json({
    stories: [
      {
        name: "Ruben Chirino",
        src: "/images/stories/ruben.jpg",
        profile: "/images/profiles/ruben.jpg",
      },
      {
        name: "Elon Musk",
        src: "/images/stories/elon.jpg",
        profile: "/images/profiles/elon.jpg",
      },
      {
        name: "Jeff Bezoz",
        src: "/images/stories/jeff.webp",
        profile: "/images/profiles/jeff.jpg",
      },
      {
        name: "Mark Zuckerberg",
        src: "/images/stories/mark.jpg",
        profile: "/images/profiles/mark.jpg",
      },
      {
        name: "Bill Gates",
        src: "/images/stories/bill.jpg",
        profile: "/images/profiles/bill.jpg",
      },
    ],
    contacts: [
      {
        name: "Selena Gomez",
        src: "/images/profiles/selena.jpg",
      },
      {
        name: "Tom Holland",
        src: "/images/profiles/holland.jpg",
      },
      {
        name: "Cristiano Ronaldo",
        src: "/images/profiles/cristiano.jpg",
      },
      {
        name: "Billie Eilish",
        src: "/images/profiles/billie.jpg",
      },
      {
        name: "Elon Musk",
        src: "/images/profiles/elon.jpg",
      },
      {
        name: "Donald Trump",
        src: "/images/profiles/trump.jpg",
      },
      {
        name: "Mark Zuckerberg",
        src: "/images/profiles/mark.jpg",
      },
    ],
  });
}

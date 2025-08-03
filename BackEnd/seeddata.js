import mongoose from "mongoose";
import userModel from "./Model/user.model.js";
import channelModel from "./Model/channel.model.js";
import VideoModel from "./Model/video.model.js";
import CommentModel from "./Model/comments.model.js";

mongoose
  .connect(
    "mongodb+srv://balaji5220771:dMoPRcPPQGfrs593@cluster0.wyl2bi0.mongodb.net/"
  )
  .then(() => {
    console.log("MongoDB connected");
    seedData();
  })
  .catch((err) => console.error(err));

// Dummy data generator
async function seedData() {
  try {
    // Clear existing data
    // await userModel.deleteMany({});
    // await channelModel.deleteMany({});
    // await VideoModel.deleteMany({});
    // await CommentModel.deleteMany({});

    // Create Users
    const users = await userModel.findOne({
      email: "vinaykumar88@outlook.com",
    });
    if (!users) {
      console.log("invalid user");
    }

    // Create Channels for Users
    const channels = await channelModel.insertOne(
      {
        name: "Crunchyroll",
        description: `Crunchyroll brings you clips, anime openings, anime endings, trailers, teasers, and full episodes every week from the best titles anime has to offer!`,
        bannerImage:
          "https://yt3.googleusercontent.com/a-IO4YkB9Nwu9CSv5TKcf46mn5YpvL9z3wvj6GB7CAJ_1fMtZnK5Olqme-be4RobBmx5Cwqy=w1707-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj",
        channelImage:
          "https://yt3.googleusercontent.com/BUp_RGMNx21asWdmkCSN0X9QoBAARyCXxG_cnC-Zd4_8xARZDgRDVjbhSa99jmoy4z9bdbNy=s160-c-k-c0x00ffffff-no-rj",
        ownerId: users._id,
        subscribers: 69400,
      }
      // {
      //   name: "Coding_Games",
      //   description:
      //     "Welcome to Coding Games! Level up your programming skills through fun and interactive coding challenges, logic puzzles, algorithm battles, and game-based learning. Whether you're a beginner or a pro, our videos make coding exciting, engaging, and competitive. Subscribe and start playing with code!",
      //   bannerImage:
      //     "https://yt3.googleusercontent.com/po00oKl5fsNPvxAkHQ0EJYuUAP2md8I4CWTSVcIq8sLEi0LouIx-rl5dfTWQdvTT0JUieR0--A=w1707-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj",
      //   channelImage:
      //     "https://yt3.googleusercontent.com/Em6NkBf7p2WfiA3GXM_aSLszdDW5od5LTmf9USdmNCC8pKMRu5oCdG_TeuLGk1dl1oMBVZ4lNA=s160-c-k-c0x00ffffff-no-rj",
      //   ownerId: users._id,
      //   subscribers: 980000,
      // },
    );

    // Add channelIds to users
    await Promise.all([
      userModel.findByIdAndUpdate(users._id, {
        channelIds: [channels._id],
      }),
    ]);

    // Create Videos
    const videos = await VideoModel.insertMany([
      {
        title: `
Sung Jinwoo vs The Ant King | Solo Leveling Season 2 -Arise from the Shadow-`,
        description: `Jinwoo crushes the Ant King like a bug in episode 24! Watch Solo Leveling Season 2 - Arise from the Shadow - on Crunchyroll! https://got.cr/cc-sl2

Solo Leveling Season 2 Episode 12 English Subbed. Solo Leveling Season 2 Episode 24. 

They say whatever doesn’t kill you makes you stronger, but that’s not the case for the world’s weakest hunter Sung Jinwoo. After being brutally slaughtered by monsters in a high-ranking dungeon, Jinwoo came back with the System, a program only he could see, that’s leveling him up in every way. Now, he’s inspired to discover the secrets behind his powers and the dungeon that spawned them.

Crunchyroll brings you the latest clips, openings, full episodes, and more from your favorite anime! `,
        videoUrl: "https://www.youtube.com/embed/IrHTT2IEKpE",
        thumbnailUrl: "https://img.youtube.com/vi/IrHTT2IEKpE/hq720.jpg",
        channelId: channels._id,
        uploadedBy: users._id,
        views: 23872334,
        likes: 299000,
        dislikes: 0,
        tags: [
          "solo leveling",
          "solo leveling season 2",
          "solo leveling episode 24",
          "jinwoo vs ant king",
          "sung jinwoo",
          "solo leveling arise",
          "solo leveling fight",
          "solo leveling anime",
          "solo leveling english sub",
          "shadow monarch",
          "ant king solo leveling",
          "solo leveling 2025",
          "solo leveling crunchyroll",
          "anime fights 2025",
          "overpowered mc anime",
          "solo leveling full episode",
          "webtoon anime adaptation",
          "dungeon hunter anime",
          "solo leveling ep24",
        ],
      },
      {
        title: `Solo Leveling Season 2 -Arise from the Shadow- Ending | "Un-Apex" by TK from Ling Tosite Sigure`,
        description: `Solo Leveling ED2 "Un-Apex" by TK from Ling Tosite Sigure. Watch Solo Leveling Season 2 - Arise from the Shadow - on Crunchyroll! https://got.cr/cc-sl2op

More Solo Leveling Openings & Endings:
   • Solo Leveling Opening | "LEveL" by Hiroyuk...  
   • Solo Leveling Season 2 -Arise from the Sha...  
   • Solo Leveling - Ending | "Request" by Krage  

Watch Solo Leveling's Best Moments:
   • Solo Leveling Moments  

They say whatever doesn’t kill you makes you stronger, but that’s not the case for the world’s weakest hunter Sung Jinwoo. After being brutally slaughtered by monsters in a high-ranking dungeon, Jinwoo came back with the System, a program only he could see, that’s leveling him up in every way. Now, he’s inspired to discover the secrets behind his powers and the dungeon that spawned them.
`,

        videoUrl: "https://www.youtube.com/embed/KxeHOxO3A3I",
        thumbnailUrl: "https://i.ytimg.com/vi/KxeHOxO3A3I/hq720.jpg",
        channelId: channels._id,
        uploadedBy: users._id,
        views: 2426858,
        likes: 400000,
        dislikes: 0,
        tags: [
          "solo leveling season 2",
          "solo leveling ending",
          "solo leveling arise from the shadow",
          "un-apex",
          "tk from ling tosite sigure",
          "anime ending song",
          "solo leveling soundtrack",
          "anime music 2025",
          "unapex tk",
          "ling tosite sigure",
          "solo leveling op ed",
          "solo leveling anime",
          "anime ending 2025",
          "anime ost",
          "solo leveling song",
          "tk solo leveling",
          "solo leveling theme song",
          "anime music video",
          "anime ed",
        ],
      },

      {
        title: `SUNG JIN-WOO | SOLO LEVELING ASMV`,
        description: `
Don’t forget to subscribe, like, comment, or share! That is always appreciated and really helps the channel grow!

Recommend HEADPHONES/WATCHING IN 4K 

Phenomenal show. Solo leveling really just is peak anime motivation. Pretty sure I made this for my own gym motivation. Hope you enjoy!

Main YT: /     / @conceptsjrs  
Twitter:   / conceptsjrs   
Instagram:   / concepts_jrs   
Facebook:   / conceptsjrs   
Software: Adobe Premiere Pro, Adobe Audition, Adobe Photoshop, Aftereffects, Topaz Video AI

Fandom: Solo leveling

I believe stories (and how we share them) have the ability to reshape our lives and teach us lessons that we might normally not come upon without hardship. The human capacity for cruelty has always troubled me. I will continue to make more videos/photos in the hope that I can offer something positive to the world, however small. THIS is what I love doing. If you like the content, subscribe, share, like, and comment, and let me know of any future fanvid's you would like to see! 

If you’re looking for a way to support my work, buy me a cup of coffee and tell me your story in a message! https://www.buymeacoffee.com/conceptsjrs 

I also do freelance work for photo and video editing: ConceptsJRS@gmail.com

Music: I’ve repeatedly been asked for what songs I use, I always list them in order. What varies is how much I alter them.  `,
        videoUrl: "https://www.youtube.com/embed/gH_nHVvfJiI",
        thumbnailUrl: "https://i.ytimg.com/vi/gH_nHVvfJiI/hq720.jpg",
        channelId: channels._id,
        uploadedBy: users._id,
        views: 116582,
        likes: 3200,
        dislikes: 0,
        tags: [
          "solo leveling",
          "sung jinwoo",
          "solo leveling asmv",
          "asmv solo leveling",
          "anime music video",
          "jinwoo solo leveling",
          "shadow monarch",
          "op anime mc",
          "anime edit",
          "asmv edit",
          "solo leveling edit",
          "jinwoo transformation",
          "epic anime scenes",
          "anime fight music",
          "overpowered anime characters",
          "anime action music video",
          "jinwoo asmv",
          "solo leveling amv",
          "anime badass moments",
        ],
      },
      {
        title: `Demon Slayer -Kimetsu no Yaiba- The Movie: Infinity Castle | Tanjiro, Nezuko, Muzan | Review & Facts`,
        description: `Demon Slayer Kimetsu no Yaiba The Movie: Infinity Castle | Tanjiro, Nezuko, Muzan | Review & Facts Video

Demon Slayer: Infinity Castle delivers the highly anticipated climactic arc of the Demon Slayer anime saga, plunging viewers into the final battle between the Demon Slayer Corps and Muzan Kibutsuji. As Tanjiro, Nezuko, Zenitsu, Inosuke, and the Hashira invade Muzan’s terrifying Infinity Castle, the action intensifies with emotional stakes, unforgettable visuals, and heartbreaking sacrifices.

With breathtaking animation by ufotable, this film adapts the epic confrontation in a cinematic format, pushing the limits of storytelling and visual excellence. The movie features unforgettable showdowns against the Upper Moons, the secrets behind Muzan's origins, and the ultimate fate of the characters we've followed since Season 1. This is not a movie but a review and facts video.

Film Details:
Japanese Title: 劇場版「鬼滅の刃」無限城編
Release Date: 2025 (TBA)
Director: Haruo Sotozaki
Animation Studio: ufotable `,
        videoUrl: "https://www.youtube.com/embed/112tc0mmpmQ",
        thumbnailUrl: "https://i.ytimg.com/vi/112tc0mmpmQ/hq720.jpg",
        channelId: channels._id,
        uploadedBy: users._id,
        views: 620349,
        likes: 3000,
        dislikes: 0,
        tags: [
          "demon slayer",
          "kimetsu no yaiba",
          "infinity castle movie",
          "demon slayer infinity castle",
          "tanjiro kamado",
          "nezuko kamado",
          "muzan kibutsuji",
          "infinity castle arc",
          "demon slayer movie review",
          "demon slayer facts",
          "anime movie 2025",
          "hashira vs muzan",
          "demon slayer ending",
          "kimetsu no yaiba review",
          "anime fight scenes",
          "tanjiro vs muzan",
          "nezuko demon form",
          "demon slayer fan theories",
          "demon slayer lore",
          "anime movie breakdown",
        ],
      },
      {
        title: `All Thunder Breathing Thunderclap And Flash Forms 720p Demon Slayer`,
        description: `This video is a repost from a YouTuber who's video got taken off. `,
        videoUrl: "https://www.youtube.com/embed/7OW8T9j_eT4",
        thumbnailUrl: "https://i.ytimg.com/vi/7OW8T9j_eT4/hq720.jpg",
        channelId: channels._id,
        uploadedBy: users._id,
        views: 3267728,
        likes: 26000,
        dislikes: 0,
        tags: [
          "thunder breathing",
          "thunderclap and flash",
          "zenitsu agatsuma",
          "all thunder breathing forms",
          "zenitsu thunderclap",
          "demon slayer thunder breathing",
          "zenitsu fight scenes",
          "zenitsu godspeed",
          "thunderclap and flash variations",
          "anime breathing styles",
          "demon slayer breathing techniques",
          "kimetsu no yaiba",
          "zenitsu vs demons",
          "zenitsu lightning style",
          "zenitsu thunder forms",
          "anime sword techniques",
          "thunder breathing explained",
          "demon slayer techniques",
          "anime battle scenes",
          "720p anime clips",
        ],
      },
      {
        title: `
Demon Slayer - Tanjiro vs uppermoon 4 (Hinokami Kagura Dragon Sun Halo Head Dance)`,
        description: `Tanjiro Kamado faces off against Upper Moon Four, Hantengu. During their battle, Hantengu uses his unique ability to split himself into multiple copies, making it difficult for Tanjiro to land a decisive blow. However, Tanjiro's training and determination enable him to adapt to Hantengu's tactics and eventually find an opening to strike. With the help of his friends and allies, Tanjiro manages to defeat Hantengu and deliver a fatal blow. This victory is a significant milestone in Tanjiro's journey as a demon slayer and brings him one step closer to achieving his ultimate goal of avenging his family and turning his sister Nezuko back into a human. Tanjiro used nezukos blood to activate his fire sword
 `,
        videoUrl: "https://www.youtube.com/embed/h9DMv7ChSHo",
        thumbnailUrl: "https://i.ytimg.com/vi/h9DMv7ChSHo/hq720.jpg",
        channelId: channels._id,
        uploadedBy: users._id,
        views: 1376177,
        likes: 12545,
        dislikes: 0,
        tags: [
          "tanjiro vs upper moon 4",
          "hinokami kagura",
          "dragon sun halo head dance",
          "tanjiro kamado",
          "demon slayer fight scene",
          "upper moon 4 fight",
          "tanjiro new form",
          "demon slayer season 3",
          "kimetsu no yaiba",
          "hinokami kagura dance",
          "tanjiro breathing techniques",
          "anime epic fight",
          "sun breathing technique",
          "tanjiro vs hantengu",
          "demon slayer sword skills",
          "sun breathing explained",
          "tanjiro final form",
          "anime dragon attack",
          "anime fight animation",
          "ufotable animation",
        ],
      },
    ]);

    // Create Comments
    // const comments = await CommentModel.insertMany([
    //   {
    //     videoId: videos[0]._id,
    //     userId: users[1]._id,
    //     text: "Very helpful video! Thanks!",
    //   },
    //   {
    //     videoId: videos[1]._id,
    //     userId: users[0]._id,
    //     text: "Manali looks amazing 😍",
    //   },
    //   {
    //     videoId: videos[0]._id,
    //     userId: users[0]._id,
    //     text: "Glad you liked it!",
    //   },
    //   {
    //     videoId: videos[1]._id,
    //     userId: users[1]._id,
    //     text: "It truly is, you should visit!",
    //   },
    // ]);

    console.log("✅ Dummy data inserted successfully");
    process.exit();
  } catch (error) {
    console.error("❌ Error inserting dummy data:", error);
    process.exit(1);
  }
}

// Imports
const messages = {
  data: {
    // In further updates, all of the text will be stored in here
    system: {
      time: {
        hours: {
          fr: "heures",
          en: "hours",
        },
        minutes: {
          fr: "minutes",
          en: "minutes",
        },
      },
    },
    commands: {
      apod: {
        description: {
          fr: "Afficher l'astronomie du jour.",
          en: "Display the astronomy picture of the day.",
        },
        usage: "apod",
      },
      dick: {
        description: {
          fr: "À quoi tu t'attends ?",
          en: "What are u expecting for ?",
        },
        usage: "dick",
      },
      draw: {
        description: {
          fr: "Dessine ce que tu veux !",
          en: "Draw anything yout want !",
        },
        usage: "draw <something>",
      },
      gif: {
        description: {
          fr: "Envoyer un GIF.",
          en: "Send a GIF.",
        },
        usage: "gif <something>",
      },
      gpt: {
        description: {
          fr: "Désactiver ou réactiver GPT4 sur le serveur.",
          en: "Disable or enable again GPT4 on this server.",
        },
        usage: "gpt <enable|disable>",
      },
      help: {
        description: {
          fr: "Liste des commandes",
          en: "List of commands",
        },
        usage: "help <command|category> <page>",
        replies: {
          default: {
            title: {
              fr: "Liste des commandes",
              en: "List of commands",
            },
            description: {
              fr: "Utilise ``{prefix}help <catégorie>`` pour plus de détails !",
              en: "Use ``{prefix}help <category>`` for more details!",
            },
            chatbot: {
              name: {
                fr: "Chatbot",
                en: "Chatbot",
              },
              value: {
                fr: "```Mentionne moi pour discuter avec moi !```",
                en: "```Mention me to chat with me!```",
              },
            },
          },
          categories: {
            all: {
              title: {
                fr: "Liste de toutes les commandes",
                en: "List of all commands",
              },
              description: {
                fr: "Afficher toutes les commandes",
                en: "Display all commands",
              },
            },
            fun: {
              title: {
                fr: "Liste des commandes fun",
                en: "List of fun commands",
              },
              description: {
                fr: "Commandes sympathiques",
                en: "Fun commands",
              },
            },
            interactions: {
              title: {
                fr: "Liste des commandes d'interaction",
                en: "List of interaction commands",
              },
              description: {
                fr: "Besoin de frapper quelqu'un ?",
                en: "Need to hit someone ?",
              },
            },
            configurations: {
              title: {
                fr: "Liste des commandes de configuration",
                en: "List of configuration commands",
              },
              description: {
                fr: "Configurer le bot",
                en: "Configure the bot",
              },
            },
            misc: {
              title: {
                fr: "Liste des commandes diverses",
                en: "List of miscellaneous commands",
              },
              description: {
                fr: "Commandes diverses",
                en: "Miscellaneous commands",
              },
            },
          },
          notFound: {
            title: {
              fr: "Commande inconnue",
              en: "Unknown command",
            },
            description: {
              fr: "La commande ``{command}`` n'existe pas !\nConsulte ``{prefix}help`` pour voir la liste des commandes.",
              en: "The command ``{command}`` doesn't exist!\nUse ``{prefix}help`` to see the list of commands.",
            },
          },
          chatBot: {
            title: {
              fr: "Chatbot propulsé par GPT4 !",
              en: "Chatbot powered by GPT4!",
            },
            description: {
              fr: "Grâce à GPT4 d'OpenAI, **{botName}** est capable d'interagir avec vous tant que vous **le mentionnez dans votre message**, ou **lui répondez directement**.",
              en: "Thanks to OpenAI's GPT4, **{botName}** is able to interact with you as long as you **mention him in your message**, or **directly reply to him**.",
            },
            features: {
              context: {
                title: {
                  fr: "Suivi du contexte",
                  en: "Content Tracking",
                },
                description: {
                  fr: "Le contexte de la conversation est suivi, ce qui permet à **{botName}** de comprendre le sujet de la conversation !.",
                  en: "The context of the conversation is tracked, allowing **{botName}** to understand the subject of the conversation!",
                },
              },
              buddy: {
                title: {
                  en: "Your AI buddy",
                  fr: "Votre pote IA",
                },
                description: {
                  fr: "L'IA est spécifiquement entraînée pour être votre pote !",
                  en: "The AI is specifically trained to be a super cool companion!",
                },
              },
            },
            privacy: {
              title: {
                fr: "Confidentialità",
                en: "Privacy",
              },
              description: {
                fr: "Le bot ne stocke ni ne partage aucune donnée de conversation par défaut. L'historique des conversations n'est accessible que lorsque le bot est spécifiquement mentionné. Cependant, si vous préférez vous assurer qu'OpenAI n'a pas accès à ces conversations lors de la génération de texte, vous pouvez désactiver cette fonctionnalité dans les paramètres.",
                en: "The bot does not store or share any conversation data by default. Conversation history is only accessed when the bot is specifically mentioned. However, if you prefer to ensure that OpenAI does not have access to these conversations during text generation, you can disable this feature in the settings.",
              },
            },
          },
        },
      },
      interactions: {
        bite: {
          description: {
            fr: "Mordre quelqu'un.",
            en: "Bite someone.",
          },
          usage: "bite <user>",
          getAction: {
            fr: (msg, target) => {
              const actionMessages = [
                `😡 ${msg.author} mord méchamment ${target}! 👄`,
                `${msg.author} plante ses dents dans ${target}! 😤`,
                `🐺 ${msg.author} donne un coup de dents à ${target}! 😠`,
                `😡 ${msg.author} mord ${target} avec colère! 😡`,
              ];
              return actionMessages[
                Math.floor(Math.random() * actionMessages.length)
              ];
            },
            en: (msg, target) => {
              const actionMessages = [
                `😡 ${msg.author} angrily bites ${target}! 👄`,
                `${msg.author} sinks their teeth into ${target}! 😤`,
                `🐺 ${msg.author} takes a bite out of ${target}! 😠`,
                `😡 ${msg.author} bites ${target} with anger! 😡`,
              ];
              return actionMessages[
                Math.floor(Math.random() * actionMessages.length)
              ];
            },
          },
        },
        blush: {
          description: {
            fr: "Rougir comme une tomate !",
            en: "Blush like a tomato!",
          },
          usage: "blush",
          getAction: {
            fr: (msg) => {
              const actionMessages = [
                `${msg.author} rougit ! 😳`,
                `Les joues de ${msg.author} deviennent roses ! 🥺`,
                `Oh là là, ${msg.author} tout gêné ! 😅`,
                `${msg.author} affiche une belle rougeur ! 😊`,
              ];
              return actionMessages[
                Math.floor(Math.random() * actionMessages.length)
              ];
            },
            en: (msg) => {
              const actionMessages = [
                `${msg.author} blushes! 😳`,
                `${msg.author}'s cheeks turn pink! 🥺`,
                `Oh my, ${msg.author} looks embarrassed! 😅`,
                `${msg.author} shows a nice blush! 😊`,
              ];
              return actionMessages[
                Math.floor(Math.random() * actionMessages.length)
              ];
            },
          },
        },
        bonk: {
          description: {
            fr: "Donner un coup de poing amical à quelqu'un.",
            en: "Give someone a friendly fist bump.",
          },
          usage: "brofist <user>",
          getAction: {
            fr: (msg, target) => {
              const actionMessages = [
                `${msg.author} donne un coup de poing amical à ${target} ! ✊`,
                `En signe de camaraderie, ${msg.author} fait un fist bump avec ${target} ! 🤝`,
                `👊 ${msg.author} et ${target} se donnent un high five avec enthousiasme !`,
                `🤜🤛 ${msg.author} fait un fist bump à ${target} dans un geste amical !`,
              ];
              return actionMessages[
                Math.floor(Math.random() * actionMessages.length)
              ];
            },
            en: (msg, target) => {
              const actionMessages = [
                `${msg.author} gives ${target} a friendly fist bump! ✊`,
                `In a sign of camaraderie, ${msg.author} fist bumps ${target}! 🤝`,
                `👊 ${msg.author} and ${target} high five each other enthusiastically!`,
                `🤜🤛 ${msg.author} fist bumps ${target} in a friendly gesture!`,
              ];
              return actionMessages[
                Math.floor(Math.random() * actionMessages.length)
              ];
            },
          },
        },
        bully: {
          description: {
            fr: "Embêter quelqu'un.",
            en: "Tease someone.",
          },
          usage: "tease <user>",
          getAction: {
            fr: (msg, target) => {
              const actionMessages = [
                `😄 ${msg.author} embête ${target} ! 😜`,
                `Préparez-vous, ${msg.author} taquine ${target} ! 😆`,
                `C'est l'heure des moqueries avec ${msg.author} et ${target} ! 😂`,
                `😝 ${msg.author} fait des blagues pour embêter ${target} !`,
              ];
              return actionMessages[
                Math.floor(Math.random() * actionMessages.length)
              ];
            },
            en: (msg, target) => {
              const actionMessages = [
                `😄 ${msg.author} playfully teases ${target}! 😜`,
                `Get ready, ${msg.author} teases ${target}! 😆`,
                `It's time for some banter with ${msg.author} and ${target}! 😂`,
                `😝 ${msg.author} cracks jokes to tease ${target}!`,
              ];
              return actionMessages[
                Math.floor(Math.random() * actionMessages.length)
              ];
            },
          },
        },
        cuddle: {
          description: {
            fr: "Faire un câlin chaleureux.",
            en: "Give a warm hug.",
          },
          usage: "cuddle <user>",
          getAction: {
            fr: (msg, target) => {
              const actionMessages = [
                `${msg.author} câline tendrement ${target} ! 🤗`,
                `${msg.author} serre ${target} dans ses bras ! ❤️`,
                `🤗 ${msg.author} enlace ${target} avec douceur !`,
                `${msg.author} et ${target} se blottissent dans un câlin apaisant ! 😌`,
                `Un câlin amical entre ${msg.author} et ${target} ! 🤗`,
                `🤗 ${msg.author} offre un câlin réconfortant à ${target} ! 💓`,
              ];
              return actionMessages[
                Math.floor(Math.random() * actionMessages.length)
              ];
            },
            en: (msg, target) => {
              const actionMessages = [
                `${msg.author} gives a warm hug to ${target}! 🤗`,
                `${msg.author} embraces ${target}! ❤️`,
                `🤗 ${msg.author} wraps ${target} in a gentle hug!`,
                `${msg.author} and ${target} snuggle in a soothing hug! 😌`,
                `A friendly hug between ${msg.author} and ${target}! 🤗`,
                `🤗 ${msg.author} offers a comforting hug to ${target}! 💓`,
              ];
              return actionMessages[
                Math.floor(Math.random() * actionMessages.length)
              ];
            },
          },
        },
        cringe: {
          description: {
            fr: "Faire une grimace de dégoût.",
            en: "Make a cringe face.",
          },
          usage: "cringe",
          getAction: {
            fr: (msg) => {
              const actionMessages = [
                `${msg.author} fait une grimace de dégoût. 😬`,
                `Oh non, ${msg.author} fait une moue de déplaisir. 😖`,
                `:grimacing: ${msg.author} grimace de façon cringe. 😬`,
                `${msg.author} est en mode cringe. 😟`,
                `Tout le monde regarde ${msg.author} avec perplexité. 😵`,
                `${msg.author} se tortille de dégoût. 😫`,
              ];
              return actionMessages[
                Math.floor(Math.random() * actionMessages.length)
              ];
            },
            en: (msg) => {
              const actionMessages = [
                `${msg.author} makes a cringe face. 😬`,
                `Oh no, ${msg.author} makes a displeased expression. 😖`,
                `:grimacing: ${msg.author} cringes in a cringe-worthy way. 😬`,
                `${msg.author} is in cringe mode. 😟`,
                `Everyone looks at ${msg.author} with bewilderment. 😵`,
                `${msg.author} twists in disgust. 😫`,
              ];
              return actionMessages[
                Math.floor(Math.random() * actionMessages.length)
              ];
            },
          },
        },
        cry: {
          description: {
            fr: "Exprimer tristesse en pleurant.",
            en: "Express sadness by crying.",
          },
          usage: "cry",
          getAction: {
            fr: (msg) => {
              const actionMessages = [
                `${msg.author} fond en larmes... 😢`,
                `${msg.author} pleure à chaudes larmes... 😭`,
                `${msg.author} est submergé par la tristesse... 😞`,
                `Oh non, ${msg.author} a besoin de réconfort ! 😔`,
              ];
              return actionMessages[
                Math.floor(Math.random() * actionMessages.length)
              ];
            },
            en: (msg) => {
              const actionMessages = [
                `${msg.author} is crying... 😢`,
                `${msg.author}'s tears are flowing... 😭`,
                `${msg.author} is overwhelmed by sadness... 😞`,
                `Oh no, ${msg.author} needs comfort! 😔`,
              ];
              return actionMessages[
                Math.floor(Math.random() * actionMessages.length)
              ];
            },
          },
        },
        dance: {
          description: {
            fr: "Danser avec enthousiasme !",
            en: "Dance with enthusiasm!",
          },
          usage: "dance",
          getAction: {
            fr: (msg) => {
              const actionMessages = [
                `${msg.author} danse avec enthousiasme ! 💃`,
                `La piste de danse appartient à ${msg.author} ce soir ! 💃`,
                `💃 ${msg.author} se déhanche au rythme de la musique ! 🎶`,
                `La danse incroyable de ${msg.author} ! 💫`,
                `La foule est en feu grâce à la danse de ${msg.author} ! 🔥`,
                `💃💃 ${msg.author} fait tourner la tête à tout le monde avec sa danse !`,
                `La soirée est plus folle grâce à la danse de ${msg.author} ! 🎉`,
              ];
              return actionMessages[
                Math.floor(Math.random() * actionMessages.length)
              ];
            },
            en: (msg) => {
              const actionMessages = [
                `${msg.author} dances with enthusiasm! 💃`,
                `The dance floor belongs to ${msg.author} tonight! 💃`,
                `${msg.author} dances with joy! 💃`,
                `💃 ${msg.author} dances! 🎶`,
                `${msg.author} dances! 💃`,
              ];
              return actionMessages[
                Math.floor(Math.random() * actionMessages.length)
              ];
            },
          },
        },
        handhold: {
          description: {
            fr: "Tenir la main de quelqu'un avec douceur.",
            en: "Hold someone's hand gently.",
          },
          usage: "handhold <user>",
          getAction: {
            fr: (msg, target) => {
              const actionMessages = [
                `${msg.author} tient doucement la main de ${target}. 🤝`,
                `Avec tendresse, ${msg.author} prend la main de ${target}. 🤝`,
                `Les doigts de ${msg.author} s'entrelacent délicatement avec ceux de ${target}. 🤝`,
                `Un doux geste de ${msg.author} envers ${target}, qui lui tient la main. 🤝`,
                `La main de ${msg.author} trouve naturellement celle de ${target}, et ils se serrent la main avec amour. 🤝`,
                `Dans un geste réconfortant, ${msg.author} prend la main de ${target} et sourit. 🤝`,
              ];
              return actionMessages[
                Math.floor(Math.random() * actionMessages.length)
              ];
            },
            en: (msg, target) => {
              const actionMessages = [
                `${msg.author} gently holds ${target}'s hand. 🤝`,
                `With tenderness, ${msg.author} takes ${target}'s hand. 🤝`,
                `${msg.author}'s fingers delicately interlock with ${target}'s. 🤝`,
                `A soft gesture from ${msg.author} to ${target}, holding their hand. 🤝`,
                `Naturally, ${msg.author} and ${target} find their hands and shake them lovingly. 🤝`,
                `In a comforting gesture, ${msg.author} takes ${target}'s hand and smiles. 🤝`,
              ];
              return actionMessages[
                Math.floor(Math.random() * actionMessages.length)
              ];
            },
          },
        },
        happy: {
          description: {
            fr: "Exprimer la joie et le bonheur.",
            en: "Express joy and happiness.",
          },
          usage: "happy",
          getAction: {
            fr: (msg) => {
              const actionMessages = [
                `${msg.author} rayonne de bonheur ! 😄`,
                `La joie inonde ${msg.author} ! 😃`,
                `😃 ${msg.author} est tellement heureux que cela se voit ! 😁`,
                `${msg.author} déborde de joie, c'est contagieux ! 😄`,
                `La bonne humeur de ${msg.author} est contagieuse ! 😃`,
                `Le bonheur est au rendez-vous avec ${msg.author} ! 😁`,
              ];
              return actionMessages[
                Math.floor(Math.random() * actionMessages.length)
              ];
            },
            en: (msg) => {
              const actionMessages = [
                `${msg.author} radiates happiness! 😄`,
                `Joy floods ${msg.author}! 😃`,
                `😃 ${msg.author} is so happy it's visible! 😁`,
                `${msg.author} is overflowing with joy, and it's contagious! 😄`,
                `${msg.author}'s good mood is contagious! 😃`,
                `Happiness is in the air as ${msg.author} can't help but smile! 😁`,
              ];
              return actionMessages[
                Math.floor(Math.random() * actionMessages.length)
              ];
            },
          },
        },
        highfive: {
          description: {
            fr: "Donner un high five à quelqu'un.",
            en: "Give someone a high five.",
          },
          usage: "highfive <user>",
          getAction: {
            fr: (msg, target) => {
              const actionMessages = [
                `${msg.author} donne un high five à ${target} ! 🤝`,
                `En signe de camaraderie, ${msg.author} fait un high five avec ${target} ! 🤝`,
                `🤝 ${msg.author} et ${target} se donnent un high five avec enthousiasme !`,
                `🤝 ${msg.author} fait un high five à ${target} dans un geste amical !`,
              ];
              return actionMessages[
                Math.floor(Math.random() * actionMessages.length)
              ];
            },
            en: (msg, target) => {
              const actionMessages = [
                `${msg.author} gives ${target} a high five! 🤝`,
                `In a sign of camaraderie, ${msg.author} high fives ${target}! 🤝`,
                `🤝 ${msg.author} and ${target} high five each other enthusiastically!`,
                `🤝 ${msg.author} high fives ${target} in a friendly gesture!`,
              ];
              return actionMessages[
                Math.floor(Math.random() * actionMessages.length)
              ];
            },
          },
        },
        hug: {
          description: {
            fr: "Prendre quelqu'un dans ses bras.",
            en: "Hug someone.",
          },
          usage: "hug <user>",
          getAction: {
            fr: (msg, target) => {
              const actionMessages = [
                `${msg.author} prend ${target} dans ses bras chaleureusement. 🤗`,
                `${msg.author} serre ${target} dans une étreinte tendre. 🤗`,
                `${msg.author} enlace doucement ${target}. 🤗`,
                `Un câlin affectueux de ${msg.author} à ${target}. 🤗`,
                `Les bras de ${msg.author} entourent doucement ${target}. 🤗`,
                `${msg.author} serre ${target} dans une étreinte chaleureuse. 🤗`,
              ];
              return actionMessages[
                Math.floor(Math.random() * actionMessages.length)
              ];
            },
            en: (msg, target) => {
              const actionMessages = [
                `${msg.author} warmly hugs ${target}. 🤗`,
                `In a tender gesture, ${msg.author} embraces ${target}. 🤗`,
                `${msg.author} gently wraps their arms around ${target}. 🤗`,
                `An affectionate hug from ${msg.author} to ${target}. 🤗`,
                `${msg.author}'s arms softly envelop ${target}. 🤗`,
                `${msg.author} gives ${target} a warm embrace. 🤗`,
              ];
              return actionMessages[
                Math.floor(Math.random() * actionMessages.length)
              ];
            },
          },
        },
        kick: {
          description: {
            fr: "Donner un coup de pied à quelqu'un.",
            en: "Kick someone.",
          },
          usage: "kick <user>",
          getAction: {
            fr: (msg, target) => {
              const actionMessages = [
                `:rage: ${msg.author} donne un coup de pied à ${target} ! 👢`,
                `${msg.author} donne un coup de pied à ${target} ! 👢`,
                `👢 ${msg.author} donne un coup de pied à ${target} ! 😡`,
                `👢 ${msg.author} donne un coup de pied à ${target} ! 😡`,
              ];
              return actionMessages[
                Math.floor(Math.random() * actionMessages.length)
              ];
            },
            en: (msg, target) => {
              const actionMessages = [
                `:rage: ${msg.author} kicks ${target}! 👢`,
                `${msg.author} kicks ${target}! 👢`,
                `👢 ${msg.author} kicks ${target}! 😡`,
                `👢 ${msg.author} kicks ${target}! 😡`,
              ];
              return actionMessages[
                Math.floor(Math.random() * actionMessages.length)
              ];
            },
          },
        },
        kill: {
          description: {
            fr: "Tuer quelqu'un.",
            en: "Kill someone.",
          },
          usage: "kill <user>",
          getAction: {
            fr: (msg, target) => {
              const actionMessages = [
                `${msg.author} vient de tuer ${target} devant tout le monde. 😱`,
                `${msg.author} laisse ${target} pour mort. 🔪`,
                `${msg.author} vient de faire un kill sur ${target} ! 🫢\nPas de respawn cette fois !`,
                `${msg.author} avait des envies meurtrières, ${target} était là au mauvais endroit au mauvais moment. 😔`,
              ];
              return actionMessages[
                Math.floor(Math.random() * actionMessages.length)
              ];
            },
            en: (msg, target) => {
              const actionMessages = [
                `${msg.author} just killed ${target} in front of everyone. 😱`,
                `${msg.author} leaves ${target} for dead. 🔪`,
                `${msg.author} scored a kill on ${target}! 🫢\nNo respawn this time!`,
                `${msg.author} had murderous intentions, and ${target} was in the wrong place at the wrong time. 😔`,
              ];
              return actionMessages[
                Math.floor(Math.random() * actionMessages.length)
              ];
            },
          },
        },
        kiss: {
          description: {
            fr: "Embrasser quelqu'un.",
            en: "Kiss someone.",
          },
          usage: "kiss <user>",
          getAction: {
            fr: (msg, target) => {
              const actionMessages = [
                `${msg.author} envoie un doux baiser à ${target}. 😘`,
                `${msg.author} dépose un tendre baiser sur la joue de ${target}. 😘`,
                `${msg.author} embrasse délicatement ${target}. 😘`,
                `${msg.author} scelle son affection avec un baiser pour ${target}. ❤️`,
                `Les lèvres de ${msg.author} rencontrent doucement celles de ${target} dans un baiser. 😘`,
                `${msg.author} offre un baiser affectueux à ${target}. 😘`,
              ];
              return actionMessages[
                Math.floor(Math.random() * actionMessages.length)
              ];
            },
            en: (msg, target) => {
              const actionMessages = [
                `${msg.author} sends a sweet kiss to ${target}. 😘`,
                `${msg.author} gently plants a kiss on ${target}'s cheek. 😘`,
                `${msg.author} softly kisses ${target}. 😘`,
                `${msg.author} seals their affection with a kiss for ${target}. ❤️`,
                `${msg.author}'s lips meet ${target}'s in a gentle kiss. 😘`,
                `${msg.author} gives ${target} an affectionate kiss. 😘`,
              ];
              return actionMessages[
                Math.floor(Math.random() * actionMessages.length)
              ];
            },
          },
        },
        lick: {
          description: {
            fr: "Lécher quelqu'un.",
            en: "Lick someone.",
          },
          usage: "lick <user>",
          getAction: {
            fr: (msg, target) => {
              const actionMessages = [
                `${msg.author} donne une petite léchouille affectueuse à ${target}. 😛`,
                `Avec douceur, ${msg.author} effleure ${target} d'une petite léchouille. 😛`,
                `${msg.author} fait une petite léchouille espiègle à ${target}. 😉`,
                `Dans un geste ludique, ${msg.author} passe sa langue sur ${target}. 😛`,
                `Les papilles de ${msg.author} goûtent brièvement ${target} dans une léchouille taquine. 😛`,
                `${msg.author} offre une léchouille amicale à ${target}. 😉`,
              ];
              return actionMessages[
                Math.floor(Math.random() * actionMessages.length)
              ];
            },
            en: (msg, target) => {
              const actionMessages = [
                `${msg.author} gives ${target} a playful lick. 😛`,
                `Gently, ${msg.author} grazes ${target} with a little lick. 😛`,
                `${msg.author} playfully licks ${target}. 😉`,
                `In a playful gesture, ${msg.author} runs their tongue over ${target}. 😛`,
              ];
              return actionMessages[
                Math.floor(Math.random() * actionMessages.length)
              ];
            },
          },
        },
        neko: {
          description: {
            fr: "Envoyer une image de neko.",
            en: "Send a neko image.",
          },
          usage: "love",
          getAction: {
            fr: (msg) => {
              const actionMessages = [
                `${msg.author} demande une image de neko ! 😸`,
                `${msg.author} veut voir un neko ! 😺`,
                `😺 ${msg.author} veut voir un neko !`,
              ];
              return actionMessages[
                Math.floor(Math.random() * actionMessages.length)
              ];
            },
            en: (msg) => {
              const actionMessages = [
                `${msg.author} wants to see a neko! 😸`,
                `😸 ${msg.author} wants to see a neko!`,
              ];
              return actionMessages[
                Math.floor(Math.random() * actionMessages.length)
              ];
            },
          },
        },
        nom: {
          description: {
            fr: "Manger quelque chose de délicieux !",
            en: "Eat something delicious!",
          },
          usage: "nom <user>",
          getAction: {
            fr: (msg, target) => {
              const actionMessages = [
                `${msg.author} partage un délicieux festin avec ${target}. ::yum:`,
                `${msg.author} savoure un repas délicieux en compagnie de ${target}. ::hamburger:`,
                `C'est un régal ! ${msg.author} et ${target} dégustent un festin délicieux. ::pizza:`,
                `${msg.author} et ${target} se régalent avec de délicieux mets. ::fork_and_knife:`,
                `${msg.author} et ${target} savourent un repas exquis ensemble. ::spaghetti:`,
                `${msg.author} invite ${target} à un festin délicieux. ::doughnut:`,
              ];
              return actionMessages[
                Math.floor(Math.random() * actionMessages.length)
              ];
            },
            en: (msg, target) => {
              const actionMessages = [
                `${msg.author} shares a delicious feast with ${target}. ::yum:`,
                `${msg.author} enjoys a delightful meal in the company of ${target}. ::hamburger:`,
                `It's a treat! ${msg.author} and ${target} savor a delicious feast. ::pizza:`,
                `${msg.author} and ${target} relish in delicious dishes. ::fork_and_knife:`,
                `${msg.author} and ${target} indulge in an exquisite meal together. ::spaghetti:`,
                `${msg.author} invites ${target} to a delightful feast. ::doughnut:`,
              ];
              return actionMessages[
                Math.floor(Math.random() * actionMessages.length)
              ];
            },
          },
        },
        pat: {
          description: {
            fr: "Tapoter la tête de quelqu'un.",
            en: "Pat someone's head.",
          },
          usage: "pat <user>",
          getAction: {
            fr: (msg, target) => {
              const actionMessages = [
                `${msg.author} tapote doucement la tête de ${target}. :hand_splayed:`,
                `${msg.author} fait une caresse amicale à ${target}. :blush:`,
                `${msg.author} donne une petite tape amicale sur la tête de ${target}. :grin:`,
                `${msg.author} montre de l'affection en tapotant la tête de ${target}. :heart:`,
                `${msg.author} offre une tape amicale à ${target}. :hand_splayed:`,
                `${msg.author} fait une caresse douce sur la tête de ${target}. :blush:`,
              ];
              return actionMessages[
                Math.floor(Math.random() * actionMessages.length)
              ];
            },
            en: (msg, target) => {
              const actionMessages = [
                `${msg.author} gently pats ${target}'s head. :hand_splayed:`,
                `${msg.author} gives ${target} a friendly pat. :blush:`,
                `${msg.author} playfully taps ${target}'s head. :grin:`,
                `${msg.author} shows affection by patting ${target}'s head. :heart:`,
                `${msg.author} offers a friendly pat to ${target}. :hand_splayed:`,
                `${msg.author} gives ${target}'s head a gentle caress. :blush:`,
              ];
              return actionMessages[
                Math.floor(Math.random() * actionMessages.length)
              ];
            },
          },
        },
        poke: {
          description: {
            fr: "Donner un petit coup à quelqu'un.",
            en: "Poke someone.",
          },
          usage: "poke <user>",
          getAction: {
            fr: (msg, target) => {
              const actionMessages = [
                `${msg.author} taquine ${target} en lui donnant un petit coup. :point_right:`,
                `${msg.author} pique amicalement ${target}. :wink:`,
                `${msg.author} donne un petit coup à ${target}. :point_right:`,
                `${msg.author} fait un clin d'œil tout en taquinant ${target}. :wink:`,
                `${msg.author} fait une petite pichenette à ${target}. :point_right:`,
                `${msg.author} montre de l'affection en donnant un petit coup à ${target}. :heart:`,
              ];
              return actionMessages[
                Math.floor(Math.random() * actionMessages.length)
              ];
            },
            en: (msg, target) => {
              const actionMessages = [
                `${msg.author} playfully pokes ${target}. :point_right:`,
                `${msg.author} teases ${target} with a friendly poke. :wink:`,
                `${msg.author} gives ${target} a little poke. :point_right:`,
                `${msg.author} winks while poking ${target}. :wink:`,
                `${msg.author} gives ${target} a gentle poke. :point_right:`,
                `${msg.author} shows affection by poking ${target}. :heart:`,
              ];
              return actionMessages[
                Math.floor(Math.random() * actionMessages.length)
              ];
            },
          },
        },
        slap: {
          description: {
            fr: "Donner une gifle à quelqu'un.",
            en: "Slap someone.",
          },
          usage: "slap <user>",
          getAction: {
            fr: (msg, target) => {
              const actionMessages = [
                `${msg.author} gifle ${target}. :wave:`,
                `${msg.author} met une gifle à ${target}. :raised_hand:`,
                `:raised_hand: ${msg.author} gifle ${target}. :wave:`,
                `${msg.author} est vraiment en colère et ça se voit ! :rage:`,
                `:rage: ${msg.author} est furieux et ne peut le cacher ! :triumph:`,
                `${msg.author} laisse éclater sa colère pour que tout le monde le voie ! :rage:`,
              ];
              return actionMessages[
                Math.floor(Math.random() * actionMessages.length)
              ];
            },
            en: (msg, target) => {
              const actionMessages = [
                `${msg.author} slaps ${target}. :wave:`,
                `${msg.author} gives ${target} a slap. :raised_hand:`,
                `:raised_hand: ${msg.author} slaps ${target}. :wave:`,
                `${msg.author} is really angry and it shows! :rage:`,
                `:rage: ${msg.author} is furious and can't hide it! :triumph:`,
                `${msg.author} lets their anger out for everyone to see! :rage:`,
              ];
              return actionMessages[
                Math.floor(Math.random() * actionMessages.length)
              ];
            },
          },
        },
        smile: {
          description: {
            fr: "Sourire.",
            en: "Smile.",
          },
          usage: "smile",
          getAction: {
            fr: (msg) => {
              const actionMessages = [
                `${msg.author} esquisse un sourire. :blush:`,
                `${msg.author} sourit joyeusement. :grin:`,
                `:grin: ${msg.author} affiche un grand sourire. :blush:`,
                `${msg.author} rayonne de bonheur. :heart_eyes:`,
                `Le sourire illumine le visage de ${msg.author}. :blush:`,
                `${msg.author} sourit avec satisfaction. :relieved:`,
              ];
              return actionMessages[
                Math.floor(Math.random() * actionMessages.length)
              ];
            },
            en: (msg) => {
              const actionMessages = [
                `${msg.author} gives a smile. :blush:`,
                `${msg.author} smiles happily. :grin:`,
                `:grin: ${msg.author} wears a big smile. :blush:`,
                `${msg.author} radiates happiness. :heart_eyes:`,
                `A smile lights up ${msg.author}'s face. :blush:`,
                `${msg.author} smiles with contentment. :relieved:`,
              ];
              return actionMessages[
                Math.floor(Math.random() * actionMessages.length)
              ];
            },
          },
        },
        smug: {
          description: {
            fr: "Avoir un air suffisant.",
            en: "Look smug.",
          },
          usage: "smug",
          getAction: {
            fr: (msg) => {
              const actionMessages = [
                `${msg.author} arbore un air suffisant. :smirk:`,
                `${msg.author} a l'air tellement satisfait de lui-même. :satisfied:`,
                `:smirk: ${msg.author} affiche un sourire suffisant. :smirk:`,
                `${msg.author} a un petit rictus de satisfaction. :grinning:`,
                `${msg.author} se sent supérieur. :smug:`,
                `Le regard suffisant de ${msg.author} dit tout. :smirk:`,
              ];
              return actionMessages[
                Math.floor(Math.random() * actionMessages.length)
              ];
            },
            en: (msg) => {
              const actionMessages = [
                `${msg.author} looks smug. :smirk:`,
                `${msg.author} seems so pleased with themselves. :satisfied:`,
                `:smirk: ${msg.author} wears a smug smile. :smirk:`,
                `${msg.author} has a little smirk of satisfaction. :grinning:`,
                `${msg.author} feels superior. :smug:`,
                `${msg.author}'s smug look says it all. :smirk:`,
              ];
              return actionMessages[
                Math.floor(Math.random() * actionMessages.length)
              ];
            },
          },
        },
        waifu: {
          description: {
            fr: "Afficher une image de sa waifu préférée.",
            en: "Display an image of your favorite waifu.",
          },
          usage: "waifu",
          getAction: {
            fr: (msg) => {
              const actionMessages = [
                `${msg.author} affiche une image de sa waifu préférée. :heart:`,
                `${msg.author} partage une image de sa waifu avec tendresse. :sparkling_heart:`,
                `:heart: ${msg.author} a choisi une waifu exceptionnelle. :heart:`,
                `${msg.author} partage un moment magique avec sa waifu en affichant une image. :stars:`,
                `${msg.author} émerveille tout le monde en montrant une image de sa waifu préférée. :blush:`,
                `Les pensées de ${msg.author} sont remplies d'amour pour sa waifu, qu'elle partage avec une image. :heartpulse:`,
              ];
              return actionMessages[
                Math.floor(Math.random() * actionMessages.length)
              ];
            },
            en: (msg) => {
              const actionMessages = [
                `${msg.author} displays an image of their favorite waifu. :heart:`,
                `${msg.author} shares an image of their waifu with affection. :sparkling_heart:`,
                `:heart: ${msg.author} has chosen an exceptional waifu. :heart:`,
                `${msg.author} shares a magical moment with their waifu by displaying an image. :stars:`,
                `${msg.author} delights everyone by showing an image of their favorite waifu. :blush:`,
                `${msg.author}'s thoughts are filled with love for their waifu, which they share with an image. :heartpulse:`,
              ];
              return actionMessages[
                Math.floor(Math.random() * actionMessages.length)
              ];
            },
          },
        },
        wave: {
          description: {
            fr: "Faire un signe de la main.",
            en: "Wave.",
          },
          usage: "wave <user>",
          getAction: {
            fr: (msg, target) => {
              const actionMessages = [
                `${msg.author} fait un signe de la main à ${target}. :wave:`,
                `:wave: ${msg.author} salue ${target}.`,
                `${msg.author} envoie un signe amical à ${target}. :wave:`,
                `${msg.author} fait un coucou à ${target}. :wave:`,
                `${msg.author} salue ${target} avec enthousiasme. :wave:`,
                `:wave: ${msg.author} dit bonjour à ${target}.`,
              ];
              return actionMessages[
                Math.floor(Math.random() * actionMessages.length)
              ];
            },
            en: (msg, target) => {
              const actionMessages = [
                `${msg.author} waves to ${target}. :wave:`,
                `:wave: ${msg.author} greets ${target}.`,
                `${msg.author} sends a friendly wave to ${target}. :wave:`,
                `${msg.author} says hi to ${target}. :wave:`,
                `${msg.author} enthusiastically waves to ${target}. :wave:`,
                `:wave: ${msg.author} says hello to ${target}.`,
              ];
              return actionMessages[
                Math.floor(Math.random() * actionMessages.length)
              ];
            },
          },
        },
        wink: {
          description: {
            fr: "Faire un clin d'œil.",
            en: "Wink.",
          },
          usage: "wink <user>",
          getAction: {
            fr: (msg, target) => {
              const actionMessages = [
                `${msg.author} fait un clin d'œil coquin à ${target}. 😉`,
                `:wink: ${msg.author} fait un clin d'œil à ${target}. 😉`,
                `${msg.author} envoie un clin d'œil malicieux à ${target}. 😉`,
                `${msg.author} fait un clin d'œil complice à ${target}. 😉`,
                `:wink: ${msg.author} lance un clin d'œil à ${target}. 😉`,
                `${msg.author} fait un clin d'œil à ${target}. 😉`,
              ];
              return actionMessages[
                Math.floor(Math.random() * actionMessages.length)
              ];
            },
            en: (msg, target) => {
              const actionMessages = [
                `${msg.author} winks playfully at ${target}. 😉`,
                `:wink: ${msg.author} winks at ${target}. 😉`,
                `${msg.author} sends a mischievous wink to ${target}. 😉`,
                `${msg.author} shares a conspiratorial wink with ${target}. 😉`,
                `:wink: ${msg.author} shoots a wink at ${target}. 😉`,
                `${msg.author} winks at ${target}. 😉`,
              ];
              return actionMessages[
                Math.floor(Math.random() * actionMessages.length)
              ];
            },
          },
        },
        yeet: {
          description: {
            fr: "Lancer quelque chose avec force.",
            en: "Throw something forcefully.",
          },
          usage: "yeet",
          getAction: {
            fr: (msg) => {
              const actionMessages = [
                `${msg.author} lance quelque chose avec une force incroyable ! :muscle:`,
                `${msg.author} projette un objet avec puissance ! :rocket:`,
                `:muscle: ${msg.author} montre sa force en lançant un objet loin ! :dart:`,
                `${msg.author} yeet avec vigueur ! :boom:`,
                `:boom: ${msg.author} prépare un lancer impressionnant ! :rocket:`,
                `${msg.author} fait un yeet spectaculaire ! :dart:`,
              ];
              return actionMessages[
                Math.floor(Math.random() * actionMessages.length)
              ];
            },
            en: (msg) => {
              const actionMessages = [
                `${msg.author} yeets something with incredible force! :muscle:`,
                `${msg.author} hurls an object with power! :rocket:`,
                `:muscle: ${msg.author} shows their strength by throwing an object far! :dart:`,
                `${msg.author} yeets vigorously! :boom:`,
                `:boom: ${msg.author} prepares for an impressive yeet! :rocket:`,
                `${msg.author} pulls off a spectacular yeet! :dart:`,
              ];
              return actionMessages[
                Math.floor(Math.random() * actionMessages.length)
              ];
            },
          },
        },
      },
      invite: {
        description: {
          fr: "Inviter le bot sur un serveur.",
          en: "Invite the bot to a server.",
        },
        usage: "invite",
        replies: {
          fr: {
            title: "Invite le bot sur ton serveur !",
            description:
              "Clique sur les liens ci-dessous pour inviter le bot sur ton serveur.",
            botInvite: "Ajouter à un serveur",
            supportServer: "Rejoindre le serveur",
          },
          en: {
            title: "Invite the bot to your server!",
            description:
              "Click on the links below to invite the bot to your server.",
            botInvite: "Add to a server",
            supportServer: "Join the server",
          },
        },
      },
      lang: {
        description: {
          fr: "Changer la langue du bot.",
          en: "Change the bot's language.",
        },
        usage: "lang <fr|en>",
      },
      meme: {
        description: {
          fr: "Afficher un meme aléatoire.",
          en: "Display a random meme.",
        },
        usage: "meme",
      },
      mine: {
        description: {
          fr: "Miner des ressources.",
          en: "Mine resources.",
        },
        usage: "mine```\n```mine stats <user?>",
        replies: {
          stats: {
            title: {
              fr: "Statistiques de minage",
              en: "Mining statistics",
            },
            description: {
              fr: "Statistiques de ",
              en: "Statistics of ",
            },
          },
        },
      },
      ping: {
        description: {
          fr: "Vérifier la latence du bot.",
          en: "Check the bot's latency.",
        },
        usage: "ping",
      },
      prefix: {
        description: {
          fr: "Changer le préfixe du bot.",
          en: "Change the bot's prefix.",
        },
        usage: "prefix <prefix>",
      },
      vote: {
        description: {
          fr: "Voter pour gagner des <a:stars:1156021313471787058> !",
          en: "Vote to earn <a:stars:1156021313471787058>!",
        },
        usage: "vote",
        replies: {
          hasVoted: {
            false: {
              fr: "Tu n'as pas voté aujourd'hui !\n**Voter te permet d'avoir des <a:stars:1156021313471787058> !**",
              en: "You haven't voted today!\n**Voting allows you to get <a:stars:1156021313471787058>!**",
            },
            true: {
              fr: "Tu as déjà voté aujourd'hui !\nTu dois encore attendre **{timeleft}** avant de pouvoir voter à nouveau !",
              en: "You have already voted today!\nYou still have to wait **{timeleft}** before you can vote again!",
            },
          },
          clickHere: {
            fr: "Clique ici pour voter !",
            en: "Click here to vote!",
          },
          voteNow: {
            fr: "👉 **Voter maintenant !**",
            en: "👉 **Vote now!**",
          },
          stars: {
            fr: "Tu as {stars} <a:stars:1156021313471787058> !\nTu peux échange les <a:stars:1156021313471787058> contre des récompenses en utilisant la commande `${prefix}exchange <mine|gpt>` !",
            en: "You have {stars} <a:stars:1156021313471787058>!\nYou can exchange <a:stars:1156021313471787058> for rewards by using the command `${prefix}exchange <mine|gpt>`!",
          },
          doNotForgetToClaim: {
            fr: "N'oublie pas de réclamer tes récompenses !\n```{prefix}claim```",
            en: "Don't forget to claim your rewards!\n```{prefix}claim```",
          },
        },
      },
      claim: {
        description: {
          fr: "Réclamer les <a:stars:1156021313471787058> en attente !",
          en: "Claim pending <a:stars:1156021313471787058>!",
        },
        usage: "claim",
        replies: {
          hasClaims: {
            fr: "Tu as réclamé tes <a:stars:1156021313471787058> !",
            en: "You claimed your <a:stars:1156021313471787058>!",
          },
          hasNoClaims: {
            fr: "Tu n'as rien à réclamer !",
            en: "You have nothing to claim!",
          },
          checkStars: {
            fr: "Tu peux vérifier ton solde en utilisant : ```{prefix}stars```",
            en: "You can check your balance by using typing: ```{prefix}stars```",
          },
        },
      },
      stars: {
        description: {
          fr: "Voir le nombre de <a:stars:1156021313471787058> possédées.",
          en: "See the number of <a:stars:1156021313471787058> owned.",
        },
        usage: "stars",
        replies: {
          title: {
            fr: "Nombre d'étoiles possédées",
            en: "Number of owned stars",
          },
          description: {
            fr: "**Tu as {stars}x <a:stars:1156021313471787058> !**\nPlus tard tu pourras les échanger contre des récompenses super chouettes !\nAlors collecte-les en votant !",
            en: "**You have {stars}x <a:stars:1156021313471787058>!**\nLater you will be able to exchange them for super cool rewards!\nSo collect them by voting!",
          },
        },
      },
    },
  },
};
module.exports = messages;

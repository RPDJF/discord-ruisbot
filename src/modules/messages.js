// Imports
const messages = {
  data: {
    // Temporary name, next version will have all of the translations in here insteaf of fr: and en: elements
    commands: {
      interactions: {
        angrystare: {
          description: {
            fr: "Lancer un regard en colère à quelqu'un.",
            en: "Stare angrily at someone.",
          },
          usage: "angrystare <user>",
          getAction: {
            fr: (msg, target) => {
              const actionMessages = [
                `:angry: ${msg.author} fusille ${target} du regard ! :rage:`,
                `${msg.author} lance un regard de tueur à ${target} ! :triumph:`,
                `:face_with_symbols_over_mouth: ${msg.author} regarde ${target} d'un air super mécontent ! :angry:`,
                `:rage: ${msg.author} a les yeux qui lancent des éclairs en direction de ${target} !`,
              ];
              return actionMessages[
                Math.floor(Math.random() * actionMessages.length)
              ];
            },
            en: (msg, target) => {
              const actionMessages = [
                `:angry: ${msg.author} angrily stares at ${target}! :rage:`,
                `${msg.author} glares angrily at ${target}! :triumph:`,
                `:triumph: ${msg.author} stares angrily at ${target}! :angry:`,
                `${msg.author} is really angry and it shows! :rage:`,
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
                `${msg.author} rougit comme une tomate ! :blush:`,
                `Les joues de ${msg.author} prennent feu ! :flushed:`,
                `Oh là là, ${msg.author} est tout gêné ! :grin:`,
                `${msg.author} montre une belle rougeur en ce moment ! :star_struck:`,
              ];
              return actionMessages[
                Math.floor(Math.random() * actionMessages.length)
              ];
            },
            en: (msg) => {
              const actionMessages = [
                `${msg.author} blushes like a tomato! :blush:`,
                `A soft blush spreads across ${msg.author}'s cheeks! :flushed:`,
                `Oh my, ${msg.author} looks all embarrassed! :grin:`,
                `${msg.author}'s cheeks turn pink like rose petals! :rose:`,
              ];
              return actionMessages[
                Math.floor(Math.random() * actionMessages.length)
              ];
            },
          },
        },
        brofist: {
          description: {
            fr: "Donner un coup de poing amical à quelqu'un.",
            en: "Give someone a friendly fist bump.",
          },
          usage: "brofist <user>",
          getAction: {
            fr: (msg, target) => {
              const actionMessages = [
                `${msg.author} fait un brofist avec ${target} ! :fist:`,
                `En signe de camaraderie, ${msg.author} fist bump ${target}! :handshake:`,
                `:fist_bump: ${msg.author} et ${target} high five chacun avec enthousiasme !`,
                `:fist_right::fist_left: ${msg.author} fist bump ${target} dans un geste amical !`,
              ];
              return actionMessages[
                Math.floor(Math.random() * actionMessages.length)
              ];
            },
            en: (msg, target) => {
              const actionMessages = [
                `${msg.author} gives ${target} a friendly fist bump! :fist:`,
                `In a sign of camaraderie, ${msg.author} fist bumps ${target}! :handshake:`,
                `:fist_bump: ${msg.author} and ${target} high five each other enthusiastically!`,
                `:fist_right::fist_left: ${msg.author} fist bumps ${target} in a friendly gesture!`,
              ];
              return actionMessages[
                Math.floor(Math.random() * actionMessages.length)
              ];
            },
          },
        },
        celebrate: {
          description: {
            fr: "Célébrer joyeusement une occasion spéciale !",
            en: "Celebrate joyfully a special occasion!",
          },
          usage: "celebrate",
          getAction: {
            fr: (msg) => {
              const actionMessages = [
                `${msg.author} célèbre joyeusement ! :tada:`,
                `C'est le moment de faire la fête avec ${msg.author} ! :confetti_ball:`,
                `:tada: ${msg.author} fait la fête !`,
                `Les festivités sont en cours avec ${msg.author} ! :balloon:`,
                `${msg.author} répand la joie en célébrant ! :partying_face:`,
                `:sparkles: ${msg.author} s'unit à la célébration avec enthousiasme !`,
                `Que la fête commence avec ${msg.author} en tête ! :fireworks:`,
              ];
              return actionMessages[
                Math.floor(Math.random() * actionMessages.length)
              ];
            },
            en: (msg) => {
              const actionMessages = [
                `${msg.author} celebrates joyfully! :tada:`,
                `It's time to party with ${msg.author}! :confetti_ball:`,
                `:tada: ${msg.author} is partying!`,
                `The festivities are underway with ${msg.author}! :balloon:`,
                `${msg.author} spreads joy by celebrating! :partying_face:`,
                `:sparkles: ${msg.author} joins the celebration with enthusiasm!`,
                `Let the party begin with ${msg.author} in the lead! :fireworks:`,
              ];
              return actionMessages[
                Math.floor(Math.random() * actionMessages.length)
              ];
            },
          },
        },
        cheers: {
          description: {
            fr: "Trinquer avec tout le monde !.",
            en: "Cheers with everybody !.",
          },
          usage: "cheers <user>",
          getAction: {
            fr: (msg, target) => {
              const actionMessages = [
                `:tada: ${msg.author} lève son verre et trinque ! :champagne_glass:`,
                `${msg.author} se joint aux acclamations ! :tada:`,
                `:champagne_glass: ${msg.author} fait un toast et trinque ! :tada:`,
                `${msg.author} célèbre et trinque ! :champagne_glass:`,
                `:tada: ${msg.author} lève son verre et trinque avec ${target} ! :champagne_glass:`,
                `${msg.author} se joint aux acclamations avec ${target} ! :tada:`,
                `:champagne_glass: ${msg.author} fait un toast et trinque avec ${target} ! :tada:`,
              ];
              return actionMessages[
                Math.floor(Math.random() * actionMessages.length)
              ];
            },
            en: (msg, target) => {
              const actionMessages = [
                `:tada: ${msg.author} raises their glass and cheers! :champagne_glass:`,
                `${msg.author} joins the cheers! :tada:`,
                `:champagne_glass: ${msg.author} makes a toast and cheers! :tada:`,
                `${msg.author} celebrates and cheers! :champagne_glass:`,
                `:tada: ${msg.author} raises their glass and cheers with ${target}! :champagne_glass:`,
                `${msg.author} joins the cheers with ${target}! :tada:`,
                `:champagne_glass: ${msg.author} makes a toast and cheers with ${target}! :tada:`,
              ];
              return actionMessages[
                Math.floor(Math.random() * actionMessages.length)
              ];
            },
          },
        },
        confused: {
          description: {
            fr: "Exprimer la confusion de manière comique.",
            en: "Express confusion in a comical way.",
          },
          usage: "confused",
          getAction: {
            fr: (msg) => {
              const actionMessages = [
                `${msg.author} est tout perdu ! :thinking:`,
                `Regardez ${msg.author} avec son air perplexe ! :man_shrugging:`,
                `:thinking: ${msg.author} n'y comprend rien !`,
                `La tête de ${msg.author} tourne à 1000 à l'heure ! :dizzy_face:`,
                `C'est le grand mystère pour ${msg.author} ! :question:`,
                `:thinking: ${msg.author} essaie de démêler cet imbroglio ! :confused:`,
              ];
              return actionMessages[
                Math.floor(Math.random() * actionMessages.length)
              ];
            },
            en: (msg) => {
              const actionMessages = [
                `${msg.author} is totally confused! :thinking:`,
                `Look at ${msg.author} with their perplexed look! :man_shrugging:`,
                `:thinking: ${msg.author} has no clue!`,
                `${msg.author}'s head is spinning at 1000 miles per hour! :dizzy_face:`,
                `It's a big mystery for ${msg.author}! :question:`,
                `:thinking: ${msg.author} is trying to untangle this mess! :confused:`,
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
                `${msg.author} fond en larmes... :sob:`,
                `Les larmes de ${msg.author} coulent à flots... :cry:`,
                `:sob: ${msg.author} pleure à chaudes larmes...`,
                `La tristesse envahit ${msg.author} qui ne peut retenir ses émotions ! :disappointed_relieved:`,
                `C'est un moment émotionnel pour ${msg.author} qui pleure en silence... :broken_heart:`,
                `:disappointed::cry: ${msg.author} a besoin de réconfort en ce moment !`,
                `Oh non, ${msg.author} pleure à chaudes larmes ! :cry:`,
              ];
              return actionMessages[
                Math.floor(Math.random() * actionMessages.length)
              ];
            },
            en: (msg) => {
              const actionMessages = [
                `${msg.author} is crying their heart out... :sob:`,
                `Tears are streaming down ${msg.author}'s face... :cry:`,
                `:sob: ${msg.author} is sobbing uncontrollably...`,
                `Sadness overwhelms ${msg.author} who can't hold back the tears! :disappointed_relieved:`,
                `It's an emotional moment for ${msg.author} who is crying in silence... :broken_heart:`,
                `:disappointed::cry: ${msg.author} needs some comforting right now!`,
                `Oh no, ${msg.author} is crying buckets! :cry:`,
              ];
              return actionMessages[
                Math.floor(Math.random() * actionMessages.length)
              ];
            },
          },
        },
        cuddle: {
          description: {
            fr: "Faire un câlin chaleureux à quelqu'un.",
            en: "Give someone a warm hug.",
          },
          usage: "cuddle <user>",
          getAction: {
            fr: (msg, target) => {
              const actionMessages = [
                `${msg.author} serre tendrement ${target} dans ses bras pour un câlin chaleureux ! :hugging_face:`,
                `En quête de réconfort, ${msg.author} câline ${target} avec affection ! :heart:`,
                `:hugging_face: ${msg.author} enveloppe ${target} dans une étreinte douce et réconfortante !`,
                `${msg.author} et ${target} se blottissent l'un contre l'autre dans un câlin apaisant ! :relieved:`,
                `C'est un câlin amical entre ${msg.author} et ${target} ! :hug:`,
                `:hug_right::hug_left: ${msg.author} étreint ${target} avec amour et chaleur !`,
                `Dans un geste plein de tendresse, ${msg.author} offre un câlin réconfortant à ${target} ! :heartpulse:`,
              ];
              return actionMessages[
                Math.floor(Math.random() * actionMessages.length)
              ];
            },
            en: (msg, target) => {
              const actionMessages = [
                `${msg.author} tenderly hugs ${target} for a warm hug! :hugging_face:`,
                `In search of comfort, ${msg.author} cuddles ${target} affectionately! :heart:`,
                `:hugging_face: ${msg.author} wraps ${target} in a soft, comforting embrace!`,
                `${msg.author} and ${target} snuggle up to each other in a soothing hug! :relieved:`,
                `It's a friendly hug between ${msg.author} and ${target}! :hug:`,
                `:hug_right::hug_left: ${msg.author} hugs ${target} with love and warmth!`,
                `In a gesture full of tenderness, ${msg.author} offers a comforting hug to ${target}! :heartpulse:`,
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
                `${msg.author} danse avec enthousiasme ! :dancer:`,
                `La piste de danse appartient à ${msg.author} ce soir ! :dancer:`,
                `:musical_note: ${msg.author} se déhanche au rythme de la musique ! :dancing_women:`,
                `C'est une danse incroyable de ${msg.author} ! :star_struck:`,
                `La foule est en feu grâce à la danse de ${msg.author} ! :fire:`,
                `:dancer::dancer: ${msg.author} fait tourner la tête à tout le monde avec sa danse !`,
                `La soirée est plus folle grâce à la danse de ${msg.author} ! :tada:`,
              ];
              return actionMessages[
                Math.floor(Math.random() * actionMessages.length)
              ];
            },
            en: (msg) => {
              const actionMessages = [
                `${msg.author} dances with enthusiasm! :dancer:`,
                `The dance floor belongs to ${msg.author} tonight! :dancer:`,
                `${msg.author} dances with joy! :dancer:`,
                `:dancer: ${msg.author} dances! :dancer:`,
                `${msg.author} dances! :dancer:`,
              ];
              return actionMessages[
                Math.floor(Math.random() * actionMessages.length)
              ];
            },
          },
        },
        evillaugh: {
          description: {
            fr: "Rire diaboliquement !",
            en: "Evilly laugh!",
          },
          usage: "evillaugh",
          getAction: {
            fr: (msg) => {
              const actionMessages = [
                `${msg.author} éclate d'un rire diabolique ! :smiling_imp:`,
                `Un rire maléfique retentit de la part de ${msg.author} ! :japanese_goblin:`,
                `:smiling_imp: ${msg.author} ricanne méchamment...`,
                `Les plans sinistres de ${msg.author} sont en marche, et il rit diaboliquement ! :smirk:`,
                `On dirait que ${msg.author} a quelques tours machiavéliques en tête ! :sunglasses:`,
                `:smirk::smiling_imp: ${msg.author} laisse échapper un rire vraiment méchant !`,
                `Quelqu'un arrête ${msg.author} avant qu'il ne cause plus de chaos avec ce rire diabolique ! :fire:`,
              ];
              return actionMessages[
                Math.floor(Math.random() * actionMessages.length)
              ];
            },
            en: (msg) => {
              const actionMessages = [
                `${msg.author} bursts into an evil laugh! :smiling_imp:`,
                `An evil laugh rings out from ${msg.author}! :japanese_goblin:`,
                `:smiling_imp: ${msg.author} cackles evilly...`,
                `${msg.author}'s sinister plans are underway, and they laugh evilly! :smirk:`,
                `Looks like ${msg.author} has some evil schemes in mind! :sunglasses:`,
                `:smirk::smiling_imp: ${msg.author} lets out a really evil laugh!`,
                `Someone stop ${msg.author} before they cause more chaos with this evil laugh! :fire:`,
              ];
              return actionMessages[
                Math.floor(Math.random() * actionMessages.length)
              ];
            },
          },
        },
        facepalm: {
          description: {
            fr: "Faire un facepalm en signe de frustration.",
            en: "Facepalm in frustration.",
          },
          usage: "facepalm",
          getAction: {
            fr: (msg) => {
              const actionMessages = [
                `${msg.author} se donne un facepalm en signe de frustration. :facepalm:`,
                `:man_facepalming: ${msg.author} est tellement désespéré qu'il fait un facepalm.`,
                `:facepalm: ${msg.author} ne peut tout simplement pas y croire !`,
                `${msg.author} a besoin d'une pause, c'est un facepalm de frustration ! :weary:`,
                `La frustration atteint un nouveau sommet avec ${msg.author} qui fait un facepalm ! :sweat:`,
                `:weary::facepalm: ${msg.author} ne peut que secouer la tête face à la situation !`,
                `Oh non, ${msg.author} fait un facepalm à cause de ça ! :persevere:`,
              ];
              return actionMessages[
                Math.floor(Math.random() * actionMessages.length)
              ];
            },
            en: (msg) => {
              const actionMessages = [
                `${msg.author} facepalms in frustration. :man_facepalming:`,
                `:man_facepalming: ${msg.author} is so exasperated, he facepalms.`,
                `:man_facepalming: ${msg.author} just can't believe it!`,
                `${msg.author} needs a break, it's a frustration facepalm! :weary:`,
                `Frustration reaches new heights with ${msg.author} facepalming! :sweat:`,
                `:weary::man_facepalming: ${msg.author} can only shake his head at the situation!`,
                `Oh no, ${msg.author} facepalms because of this! :persevere:`,
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
                `${msg.author} tient doucement la main de ${target}. :handshake:`,
                `Avec tendresse, ${msg.author} prend la main de ${target}. :handshake:`,
                `Les doigts de ${msg.author} s'entrelacent délicatement avec ceux de ${target}. :handshake:`,
                `Un doux geste de ${msg.author} envers ${target}, qui lui tient la main. :handshake:`,
                `La main de ${msg.author} trouve naturellement celle de ${target}, et ils se serrent la main avec amour. :handshake:`,
                `Dans un geste réconfortant, ${msg.author} prend la main de ${target} et sourit. :handshake:`,
              ];
              return actionMessages[
                Math.floor(Math.random() * actionMessages.length)
              ];
            },
            en: (msg, target) => {
              const actionMessages = [
                `${msg.author} gently holds ${target}'s hand. :handshake:`,
                `With tenderness, ${msg.author} takes ${target}'s hand. :handshake:`,
                `${msg.author}'s fingers delicately interlock with ${target}'s. :handshake:`,
                `A soft gesture from ${msg.author} to ${target}, holding their hand. :handshake:`,
                `Naturally, ${msg.author} and ${target} find their hands and shake them lovingly. :handshake:`,
                `In a comforting gesture, ${msg.author} takes ${target}'s hand and smiles. :handshake:`,
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
                `${msg.author} rayonne de bonheur et le partage avec tout le monde ! :smile:`,
                `La joie inonde ${msg.author} et illumine la journée de tous ! :bliss:`,
                `:bliss: ${msg.author} est tellement heureux que cela se voit à des kilomètres ! :smile:`,
                `${msg.author} déborde de joie, c'est contagieux ! :bliss:`,
                `La bonne humeur de ${msg.author} est contagieuse, tout le monde sourit ! :smile:`,
                `Le bonheur est au rendez-vous avec ${msg.author} qui ne peut s'empêcher de sourire ! :bliss:`,
              ];
              return actionMessages[
                Math.floor(Math.random() * actionMessages.length)
              ];
            },
            en: (msg) => {
              const actionMessages = [
                `${msg.author} radiates happiness and shares it with everyone! :smile:`,
                `Joy floods ${msg.author}, brightening everyone's day! :bliss:`,
                `:bliss: ${msg.author} is so happy it can be seen from miles away! :smile:`,
                `${msg.author} is overflowing with joy, and it's contagious! :bliss:`,
                `${msg.author}'s good mood is contagious, and everyone is smiling! :smile:`,
                `Happiness is in the air as ${msg.author} can't help but smile! :bliss:`,
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
                `${msg.author} prend ${target} dans ses bras chaleureusement. :hugging:`,
                `Dans un geste tendre, ${msg.author} serre ${target} dans ses bras. :hugging:`,
                `${msg.author} enlace doucement ${target}. :hugging:`,
                `Un câlin affectueux de ${msg.author} à ${target}. :hugging:`,
                `Les bras de ${msg.author} entourent doucement ${target}. :hugging:`,
                `${msg.author} serre ${target} dans une étreinte chaleureuse. :hugging:`,
              ];
              return actionMessages[
                Math.floor(Math.random() * actionMessages.length)
              ];
            },
            en: (msg, target) => {
              const actionMessages = [
                `${msg.author} warmly hugs ${target}. :hugging:`,
                `In a tender gesture, ${msg.author} embraces ${target}. :hugging:`,
                `${msg.author} gently wraps their arms around ${target}. :hugging:`,
                `An affectionate hug from ${msg.author} to ${target}. :hugging:`,
                `${msg.author}'s arms softly envelop ${target}. :hugging:`,
                `${msg.author} gives ${target} a warm embrace. :hugging:`,
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
                `${msg.author} envoie un doux baiser à ${target}. :kissing_heart:`,
                `${msg.author} dépose un tendre baiser sur la joue de ${target}. :kiss:`,
                `${msg.author} embrasse délicatement ${target}. :kissing_face:`,
                `${msg.author} scelle son affection avec un baiser pour ${target}. :heart:`,
                `Les lèvres de ${msg.author} rencontrent doucement celles de ${target} dans un baiser. :kissing_heart:`,
                `${msg.author} offre un baiser affectueux à ${target}. :kiss:`,
              ];
              return actionMessages[
                Math.floor(Math.random() * actionMessages.length)
              ];
            },
            en: (msg, target) => {
              const actionMessages = [
                `${msg.author} sends a sweet kiss to ${target}. :kissing_heart:`,
                `${msg.author} gently plants a kiss on ${target}'s cheek. :kiss:`,
                `${msg.author} softly kisses ${target}. :kissing_face:`,
                `${msg.author} seals their affection with a kiss for ${target}. :heart:`,
                `${msg.author}'s lips meet ${target}'s in a gentle kiss. :kissing_heart:`,
                `${msg.author} gives ${target} an affectionate kiss. :kiss:`,
              ];
              return actionMessages[
                Math.floor(Math.random() * actionMessages.length)
              ];
            },
          },
        },
        laugh: {
          description: {
            fr: "Exprimer le rire et la joie.",
            en: "Express laughter and joy.",
          },
          usage: "laugh",
          getAction: {
            fr: (msg) => {
              const actionMessages = [
                `${msg.author} éclate de rire joyeusement ! :joy:`,
                `Le rire contagieux de ${msg.author} résonne dans la pièce ! :laughing:`,
                `:laughing: ${msg.author} ne peut pas s'arrêter de rire ! :joy:`,
                `Les éclats de rire de ${msg.author} mettent tout le monde de bonne humeur ! :laughing:`,
                `L'humour de ${msg.author} provoque un rire sincère chez tout le monde ! :joy:`,
                `Un rire joyeux s'échappe des lèvres de ${msg.author} ! :laughing:`,
              ];
              return actionMessages[
                Math.floor(Math.random() * actionMessages.length)
              ];
            },
            en: (msg) => {
              const actionMessages = [
                `${msg.author} bursts into laughter! :joy:`,
                `The contagious laughter of ${msg.author} echoes in the room! :laughing:`,
                `:laughing: ${msg.author} can't stop laughing! :joy:`,
                `${msg.author}'s laughter brightens everyone's mood! :laughing:`,
                `${msg.author}'s humor elicits genuine laughter from everyone! :joy:`,
                `A joyful laugh escapes ${msg.author}'s lips! :laughing:`,
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
                `${msg.author} donne une petite léchouille affectueuse à ${target}. :stuck_out_tongue_closed_eyes:`,
                `Avec douceur, ${msg.author} effleure ${target} d'une petite léchouille. :stuck_out_tongue:`,
                `${msg.author} fait une petite léchouille espiègle à ${target}. :stuck_out_tongue_winking_eye:`,
                `Dans un geste ludique, ${msg.author} passe sa langue sur ${target}. :stuck_out_tongue_closed_eyes:`,
                `Les papilles de ${msg.author} goûtent brièvement ${target} dans une léchouille taquine. :stuck_out_tongue:`,
                `${msg.author} offre une léchouille amicale à ${target}. :stuck_out_tongue_winking_eye:`,
              ];
              return actionMessages[
                Math.floor(Math.random() * actionMessages.length)
              ];
            },
            en: (msg, target) => {
              const actionMessages = [
                `${msg.author} gives ${target} a playful lick. :stuck_out_tongue_closed_eyes:`,
                `Gently, ${msg.author} grazes ${target} with a little lick. :stuck_out_tongue:`,
                `${msg.author} playfully licks ${target}. :stuck_out_tongue_winking_eye:`,
                `In a playful gesture, ${msg.author} runs their tongue over ${target}. :stuck_out_tongue_closed_eyes:`,
              ];
              return actionMessages[
                Math.floor(Math.random() * actionMessages.length)
              ];
            },
          },
        },
        love: {
          description: {
            fr: "Exprimer l'amour et l'affection.",
            en: "Express love and affection.",
          },
          usage: "love",
          getAction: {
            fr: (msg) => {
              const actionMessages = [
                `${msg.author} déborde d'amour et d'affection pour tout le monde ! :heart:`,
                `L'amour de ${msg.author} illumine la journée de tous ! :heart_eyes:`,
                `:heart_eyes: ${msg.author} exprime son amour de manière éclatante ! :heart:`,
                `L'affection de ${msg.author} est inépuisable et réchauffe les cœurs ! :heart_eyes:`,
                `Le cœur de ${msg.author} déborde d'amour, et tout le monde en profite ! :heart:`,
                `Avec une tendre affection, ${msg.author} partage son amour avec le monde entier ! :heart_eyes:`,
              ];
              return actionMessages[
                Math.floor(Math.random() * actionMessages.length)
              ];
            },
            en: (msg) => {
              const actionMessages = [
                `${msg.author} overflows with love and affection for everyone! :heart:`,
                `The love of ${msg.author} brightens everyone's day! :heart_eyes:`,
                `:heart_eyes: ${msg.author} expresses their love brightly! :heart:`,
                `${msg.author}'s affection is boundless and warms hearts! :heart_eyes:`,
                `${msg.author}'s heart is full of love, and everyone benefits from it! :heart:`,
                `With tender affection, ${msg.author} shares their love with the world! :heart_eyes:`,
              ];
              return actionMessages[
                Math.floor(Math.random() * actionMessages.length)
              ];
            },
          },
        },
        mad: {
          description: {
            fr: "Exprimer la colère et la frustration.",
            en: "Express anger and frustration.",
          },
          usage: "mad",
          getAction: {
            fr: (msg) => {
              const actionMessages = [
                `${msg.author} est en colère et exprime sa frustration ! :angry:`,
                `La colère de ${msg.author} est palpable ! :rage:`,
                `:rage: ${msg.author} ne peut pas contenir sa colère ! :angry:`,
                `La frustration de ${msg.author} atteint son apogée ! :triumph:`,
                `${msg.author} est furieux et cela se voit ! :rage:`,
                `:triumph: ${msg.author} exprime sa colère ouvertement ! :angry:`,
              ];
              return actionMessages[
                Math.floor(Math.random() * actionMessages.length)
              ];
            },
            en: (msg) => {
              const actionMessages = [
                `${msg.author} is angry and expresses frustration! :angry:`,
                `${msg.author}'s anger is palpable! :rage:`,
                `:rage: ${msg.author} can't contain their anger! :angry:`,
                `${msg.author}'s frustration reaches its peak! :triumph:`,
                `${msg.author} is furious, and it shows! :rage:`,
                `:triumph: ${msg.author} openly expresses anger! :angry:`,
              ];
              return actionMessages[
                Math.floor(Math.random() * actionMessages.length)
              ];
            },
          },
        },
        nervous: {
          description: {
            fr: "Exprimer la nervosité ou l'anxiété.",
            en: "Express nervousness or anxiety.",
          },
          usage: "nervous",
          getAction: {
            fr: (msg) => {
              const actionMessages = [
                `${msg.author} est nerveux et cela se voit ! :cold_sweat:`,
                `La nervosité de ${msg.author} est palpable ! :anxious:`,
                `:anxious: ${msg.author} ne peut pas cacher son anxiété ! :cold_sweat:`,
                `Les signes d'anxiété de ${msg.author} sont évidents ! :fearful:`,
                `${msg.author} est anxieux, et cela se ressent ! :cold_sweat:`,
                `:fearful: ${msg.author} exprime ouvertement sa nervosité ! :anxious:`,
              ];
              return actionMessages[
                Math.floor(Math.random() * actionMessages.length)
              ];
            },
            en: (msg) => {
              const actionMessages = [
                `${msg.author} is nervous, and it shows! :cold_sweat:`,
                `${msg.author}'s nervousness is palpable! :anxious:`,
                `:anxious: ${msg.author} can't hide their anxiety! :cold_sweat:`,
                `${msg.author}'s signs of anxiety are evident! :fearful:`,
                `${msg.author} is anxious, and it's noticeable! :cold_sweat:`,
                `:fearful: ${msg.author} openly expresses their nervousness! :anxious:`,
              ];
              return actionMessages[
                Math.floor(Math.random() * actionMessages.length)
              ];
            },
          },
        },
        no: {
          description: {
            fr: "Dire non.",
            en: "Say no.",
          },
          usage: "no",
          getAction: {
            fr: (msg) => {
              const actionMessages = [
                `${msg.author} secoue la tête avec conviction. ::x:`,
                `Non, non, non, ${msg.author} ne peut pas faire ça ! ::no_entry:`,
                `:no_entry: ${msg.author} refuse catégoriquement !`,
                `${msg.author} dit un non retentissant ! ::x:`,
                `La réponse de ${msg.author} est un clair et net non ! ::no_entry:`,
                `:x::no_entry: ${msg.author} n'accepte pas du tout !`,
              ];
              return actionMessages[
                Math.floor(Math.random() * actionMessages.length)
              ];
            },
            en: (msg) => {
              const actionMessages = [
                `${msg.author} shakes their head emphatically. ::x:`,
                `No, no, no, ${msg.author} can't do that! ::no_entry:`,
                `:no_entry: ${msg.author} categorically refuses!`,
                `${msg.author} delivers a resounding no! ::x:`,
                `The answer from ${msg.author} is a clear and firm no! ::no_entry:`,
                `:x::no_entry: ${msg.author} doesn't accept it at all!`,
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
        nosebleed: {
          description: {
            fr: "Saigner du nez comme dans les mangas coquins !",
            en: "Bleed from the nose like in naughty manga!",
          },
          usage: "nosebleed",
          getAction: {
            fr: (msg) => {
              const actionMessages = [
                `${msg.author} a un saignement de nez de manga ! :stuck_out_tongue_closed_eyes:`,
                `Oh non, ${msg.author} saigne du nez en voyant quelque chose d'excitant ! :scream:`,
                `:scream: Regardez ! ${msg.author} a un saignement de nez sexy ! :nosebleed:`,
                `${msg.author} attrape rapidement un mouchoir pour son saignement de nez manga. :tissue:`,
                `Les yeux de ${msg.author} brillent, et voilà un saignement de nez ! :nosebleed:`,
                `${msg.author} essaie de gérer son saignement de nez comme dans un manga ecchi. :tourniquet:`,
              ];
              return actionMessages[
                Math.floor(Math.random() * actionMessages.length)
              ];
            },
            en: (msg) => {
              const actionMessages = [
                `${msg.author} has a manga-style nosebleed! :stuck_out_tongue_closed_eyes:`,
                `Oh no, ${msg.author} is nosebleeding upon seeing something exciting! :scream:`,
                `:scream: Look! ${msg.author} has a sexy nosebleed! :nosebleed:`,
                `${msg.author} quickly grabs a tissue for their manga nosebleed. :tissue:`,
                `${msg.author}'s eyes sparkle, and there's a nosebleed! :nosebleed:`,
                `${msg.author} tries to handle their nosebleed like in an ecchi manga. :tourniquet:`,
              ];
              return actionMessages[
                Math.floor(Math.random() * actionMessages.length)
              ];
            },
          },
        },
        nyah: {
          description: {
            fr: "Dire nyah !",
            en: "Say nyah!",
          },
          usage: "nyah",
          getAction: {
            fr: (msg) => {
              const actionMessages = [
                `${msg.author} dit "Nyah !". :cat:`,
                `:cat: "Nyah !" dit ${msg.author}.`,
                `:cat::speech_balloon: ${msg.author} lance un "Nyah !" enthousiaste !`,
                `:cat: "Nyah !" répète ${msg.author} joyeusement.`,
              ];
              return actionMessages[
                Math.floor(Math.random() * actionMessages.length)
              ];
            },
            en: (msg) => {
              const actionMessages = [
                `${msg.author} says "Nyah!" :cat:`,
                `:cat: ${msg.author} goes "Nyah!"`,
                `:cat::speech_balloon: ${msg.author} exclaims "Nyah!" enthusiastically!`,
                `:cat: ${msg.author} cheerfully repeats "Nyah!"`,
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
        peek: {
          description: {
            fr: "Jeter un coup d'œil à quelque chose.",
            en: "Peek at something.",
          },
          usage: "peek",
          getAction: {
            fr: (msg) => {
              const actionMessages = [
                `${msg.author} jette un coup d'œil curieux. :eyes:`,
                `${msg.author} s'approche furtivement pour regarder. :mag:`,
                `${msg.author} regarde discrètement quelque chose. :shushing_face:`,
                `${msg.author} jette un coup d'œil rapide. :eyes:`,
              ];
              return actionMessages[
                Math.floor(Math.random() * actionMessages.length)
              ];
            },
            en: (msg) => {
              const actionMessages = [
                `${msg.author} takes a curious peek. :eyes:`,
                `${msg.author} stealthily approaches to take a look. :mag:`,
                `${msg.author} discreetly checks something out. :shushing_face:`,
                `${msg.author} quickly glances at something. :eyes:`,
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
        punch: {
          description: {
            fr: "Donner un coup de poing à quelqu'un.",
            en: "Punch someone.",
          },
          usage: "punch <user>",
          getAction: {
            fr: (msg, target) => {
              const actionMessages = [
                `${msg.author} donne un coup de poing bien placé à ${target} ! :punch::face_with_symbols_over_mouth:`,
                `Boom ! ${msg.author} vient de frapper ${target} avec une force colossale ! :boom::angry:`,
                `Oh là là, ${msg.author} est vraiment énervé et ${target} en a fait les frais ! :angry::face_with_head_bandage:`,
                `Attention, ${msg.author} est en mode Hulk et ${target} a été la cible de sa colère ! :muscle::angry:`,
                `${msg.author} se défoule en donnant un coup de poing à ${target} ! :boxing_glove::triumph:`,
                `:angry: ${msg.author} frappe ${target} tellement fort que c'est presque un K.O. ! :knockdown:`,
                `Soyez témoins de l'énorme coup de poing de ${msg.author} sur ${target} ! :punch::exploding_head:`,
              ];
              return actionMessages[
                Math.floor(Math.random() * actionMessages.length)
              ];
            },
            en: (msg, target) => {
              const actionMessages = [
                `${msg.author} punches ${target} right in the face! :punch::face_with_symbols_over_mouth:`,
                `Boom! ${msg.author} just hit ${target} with colossal force! :boom::angry:`,
                `Oh boy, ${msg.author} is really ticked off, and ${target} is on the receiving end! :angry::face_with_head_bandage:`,
                `Watch out, ${msg.author} is in Hulk mode, and ${target} felt the wrath! :muscle::angry:`,
                `${msg.author} vents by punching ${target}! :boxing_glove::triumph:`,
                `:angry: ${msg.author} hits ${target} so hard, it's almost a knockout! :knockdown:`,
                `Witness ${msg.author}'s massive punch on ${target}! :punch::exploding_head:`,
              ];
              return actionMessages[
                Math.floor(Math.random() * actionMessages.length)
              ];
            },
          },
        },
        roll: {
          description: {
            fr: "Faire rouler quelque chose.",
            en: "Roll something.",
          },
          usage: "roll",
          getAction: {
            fr: (msg) => {
              const actionMessages = [
                `${msg.author} fait rouler quelque chose. :game_die:`,
                `${msg.author} lance un dé et le laisse rouler. :game_die:`,
                `:game_die: Le dé de ${msg.author} roule sur la table. :game_die:`,
                `${msg.author} fait rouler un objet sur le sol. :game_die:`,
                `:game_die: ${msg.author} s'amuse à faire rouler un dé. :game_die:`,
              ];
              return actionMessages[
                Math.floor(Math.random() * actionMessages.length)
              ];
            },
            en: (msg) => {
              const actionMessages = [
                `${msg.author} rolls something. :game_die:`,
                `${msg.author} rolls a die and lets it roll. :game_die:`,
                `:game_die: ${msg.author}'s die rolls on the table. :game_die:`,
                `${msg.author} rolls an object on the floor. :game_die:`,
                `:game_die: ${msg.author} has fun rolling a die. :game_die:`,
              ];
              return actionMessages[
                Math.floor(Math.random() * actionMessages.length)
              ];
            },
          },
        },
        sad: {
          description: {
            fr: "Exprimer la tristesse.",
            en: "Express sadness.",
          },
          usage: "sad",
          getAction: {
            fr: (msg) => {
              const actionMessages = [
                `${msg.author} exprime sa tristesse. :cry:`,
                `${msg.author} est visiblement triste. :disappointed_relieved:`,
                `:disappointed: ${msg.author} se sent vraiment triste. :cry:`,
                `${msg.author} a besoin d'un câlin pour se remonter le moral. :hugging:`,
                `La tristesse envahit ${msg.author}. :cry:`,
                `${msg.author} fait une moue triste. :persevere:`,
              ];
              return actionMessages[
                Math.floor(Math.random() * actionMessages.length)
              ];
            },
            en: (msg) => {
              const actionMessages = [
                `${msg.author} expresses sadness. :cry:`,
                `${msg.author} looks visibly sad. :disappointed_relieved:`,
                `:disappointed: ${msg.author} is really feeling sad. :cry:`,
                `${msg.author} needs a hug to feel better. :hugging:`,
                `Sadness overwhelms ${msg.author}. :cry:`,
                `${msg.author} makes a sad face. :persevere:`,
              ];
              return actionMessages[
                Math.floor(Math.random() * actionMessages.length)
              ];
            },
          },
        },
        scared: {
          description: {
            fr: "Exprimer la peur.",
            en: "Express fear.",
          },
          usage: "scared",
          getAction: {
            fr: (msg) => {
              const actionMessages = [
                `${msg.author} exprime sa peur. :scream:`,
                `${msg.author} est terrifié. :fearful:`,
                `:fearful: ${msg.author} a vraiment peur. :scream:`,
                `${msg.author} a besoin de réconfort en raison de la peur. :hugging:`,
                `La peur s'empare de ${msg.author}. :scream:`,
                `${msg.author} regarde effrayé. :anguished:`,
              ];
              return actionMessages[
                Math.floor(Math.random() * actionMessages.length)
              ];
            },
            en: (msg) => {
              const actionMessages = [
                `${msg.author} expresses fear. :scream:`,
                `${msg.author} looks terrified. :fearful:`,
                `:fearful: ${msg.author} is really scared. :scream:`,
                `${msg.author} needs comfort because of fear. :hugging:`,
                `Fear takes over ${msg.author}. :scream:`,
                `${msg.author} looks frightened. :anguished:`,
              ];
              return actionMessages[
                Math.floor(Math.random() * actionMessages.length)
              ];
            },
          },
        },
        shy: {
          description: {
            fr: "Être timide.",
            en: "Be shy.",
          },
          usage: "shy",
          getAction: {
            fr: (msg) => {
              const actionMessages = [
                `${msg.author} est tout timide. :blush:`,
                `${msg.author} rougit de timidité. :flushed:`,
                `:flushed: ${msg.author} est vraiment timide. :blush:`,
                `${msg.author} a besoin d'un petit encouragement pour sortir de sa coquille. :blush:`,
                `La timidité envahit ${msg.author}. :blush:`,
                `${msg.author} esquisse un sourire timide. :blush:`,
              ];
              return actionMessages[
                Math.floor(Math.random() * actionMessages.length)
              ];
            },
            en: (msg) => {
              const actionMessages = [
                `${msg.author} is feeling shy. :blush:`,
                `${msg.author} blushes with shyness. :flushed:`,
                `:flushed: ${msg.author} is really shy. :blush:`,
                `${msg.author} needs a little encouragement to come out of their shell. :blush:`,
                `Shyness takes over ${msg.author}. :blush:`,
                `${msg.author} gives a shy smile. :blush:`,
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
        sleep: {
          description: {
            fr: "Dormir.",
            en: "Sleep.",
          },
          usage: "sleep",
          getAction: {
            fr: (msg) => {
              const actionMessages = [
                `${msg.author} s'endort paisiblement. :zzz:`,
                `${msg.author} ferme les yeux pour une sieste bien méritée. :sleeping:`,
                `:sleeping: ${msg.author} part dormir. :zzz:`,
                `${msg.author} a besoin de repos. :zzz:`,
                `Le sommeil emporte ${msg.author}. :sleeping:`,
                `${msg.author} s'assoupit. :sleeping:`,
              ];
              return actionMessages[
                Math.floor(Math.random() * actionMessages.length)
              ];
            },
            en: (msg) => {
              const actionMessages = [
                `${msg.author} peacefully falls asleep. :zzz:`,
                `${msg.author} closes their eyes for a well-deserved nap. :sleeping:`,
                `:sleeping: ${msg.author} is going to sleep. :zzz:`,
                `${msg.author} needs some rest. :zzz:`,
                `Sleep takes over ${msg.author}. :sleeping:`,
                `${msg.author} drifts off to sleep. :sleeping:`,
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
        sneeze: {
          description: {
            fr: "Éternuer.",
            en: "Sneeze.",
          },
          usage: "sneeze",
          getAction: {
            fr: (msg) => {
              const actionMessages = [
                `${msg.author} éternue bruyamment. :sneezing_face:`,
                `Aïe ! ${msg.author} éternue tout à coup. :mask:`,
                `:sneezing_face: ${msg.author} éternue de manière épique. :sneezing_face:`,
                `${msg.author} a besoin d'un mouchoir après cet éternuement. :face_with_thermometer:`,
                `Un éternuement surprise de ${msg.author} ! :astonished:`,
                `${msg.author} éternue et surprend tout le monde. :scream:`,
              ];
              return actionMessages[
                Math.floor(Math.random() * actionMessages.length)
              ];
            },
            en: (msg) => {
              const actionMessages = [
                `${msg.author} sneezes loudly. :sneezing_face:`,
                `Ouch! ${msg.author} suddenly sneezes. :mask:`,
                `:sneezing_face: ${msg.author} sneezes epically. :sneezing_face:`,
                `${msg.author} needs a tissue after that sneeze. :face_with_thermometer:`,
                `${msg.author} with a surprise sneeze! :astonished:`,
                `${msg.author} sneezes and surprises everyone. :scream:`,
              ];
              return actionMessages[
                Math.floor(Math.random() * actionMessages.length)
              ];
            },
          },
        },
        sorry: {
          description: {
            fr: "S'excuser.",
            en: "Apologize.",
          },
          usage: "sorry",
          getAction: {
            fr: (msg) => {
              const actionMessages = [
                `Désolé, ${msg.author} s'excuse. :disappointed:`,
                `${msg.author} exprime des regrets. :pensive:`,
                `:pensive: ${msg.author} s'excuse sincèrement. :pray:`,
                `${msg.author} s'excuse pour toute confusion. :confused:`,
                `Désolé, ${msg.author} fait amende honorable. :face_with_hand_over_mouth:`,
                `:face_with_hand_over_mouth: ${msg.author} présente ses excuses. :disappointed_relieved:`,
              ];
              return actionMessages[
                Math.floor(Math.random() * actionMessages.length)
              ];
            },
            en: (msg) => {
              const actionMessages = [
                `Sorry, ${msg.author} apologizes. :disappointed:`,
                `${msg.author} expresses regret. :pensive:`,
                `:pensive: ${msg.author} apologizes sincerely. :pray:`,
                `${msg.author} apologizes for any confusion. :confused:`,
                `Sorry, ${msg.author} makes amends. :face_with_hand_over_mouth:`,
                `:face_with_hand_over_mouth: ${msg.author} offers apologies. :disappointed_relieved:`,
              ];
              return actionMessages[
                Math.floor(Math.random() * actionMessages.length)
              ];
            },
          },
        },
        stop: {
          description: {
            fr: "Arrêter quelque chose.",
            en: "Stop something.",
          },
          usage: "stop",
          getAction: {
            fr: (msg) => {
              const actionMessages = [
                `${msg.author} dit : "Stop, c'est assez !" :stop_sign:`,
                `${msg.author} arrête tout à coup. :raised_hand:`,
                `:raised_hand: ${msg.author} décide d'arrêter. :stop_sign:`,
                `${msg.author} met fin à la situation. :no_entry_sign:`,
                `Un arrêt inattendu de ${msg.author}. :astonished:`,
                `${msg.author} stoppe tout brusquement. :raised_hand:`,
              ];
              return actionMessages[
                Math.floor(Math.random() * actionMessages.length)
              ];
            },
            en: (msg) => {
              const actionMessages = [
                `${msg.author} says, "Stop, that's enough!" :stop_sign:`,
                `${msg.author} stops suddenly. :raised_hand:`,
                `:raised_hand: ${msg.author} decides to stop. :stop_sign:`,
                `${msg.author} puts an end to the situation. :no_entry_sign:`,
                `${msg.author} with an unexpected stop. :astonished:`,
                `${msg.author} abruptly stops everything. :raised_hand:`,
              ];
              return actionMessages[
                Math.floor(Math.random() * actionMessages.length)
              ];
            },
          },
        },
        surprised: {
          description: {
            fr: "Exprimer la surprise.",
            en: "Express surprise.",
          },
          usage: "surprised",
          getAction: {
            fr: (msg) => {
              const actionMessages = [
                `Oh là là ! ${msg.author} est vraiment surpris. :astonished:`,
                `${msg.author} sursaute de surprise. :scream:`,
                `:scream: ${msg.author} est complètement étonné. :astonished:`,
                `${msg.author} est choqué. :open_mouth:`,
                `Une expression de surprise de ${msg.author} ! :astonished:`,
                `${msg.author} est étonné au-delà des mots. :exploding_head:`,
              ];
              return actionMessages[
                Math.floor(Math.random() * actionMessages.length)
              ];
            },
            en: (msg) => {
              const actionMessages = [
                `Oh my goodness! ${msg.author} is really surprised. :astonished:`,
                `${msg.author} jumps in surprise. :scream:`,
                `:scream: ${msg.author} is completely astonished. :astonished:`,
                `${msg.author} is shocked. :open_mouth:`,
                `${msg.author} with a surprised expression! :astonished:`,
                `${msg.author} is amazed beyond words. :exploding_head:`,
              ];
              return actionMessages[
                Math.floor(Math.random() * actionMessages.length)
              ];
            },
          },
        },
        sweat: {
          description: {
            fr: "Transpirer.",
            en: "Sweat.",
          },
          usage: "sweat",
          getAction: {
            fr: (msg) => {
              const actionMessages = [
                `${msg.author} transpire à grosses gouttes. :sweat_drops:`,
                `C'est chaud ici ! ${msg.author} commence à transpirer. :hot_face:`,
                `:hot_face: ${msg.author} est en train de fondre de chaleur. :sweat_drops:`,
                `${msg.author} transpire comme un athlète. :muscle:`,
                `Un peu trop de chaleur pour ${msg.author}. :fire:`,
                `${msg.author} est tout trempé de sueur. :sweat_drops:`,
              ];
              return actionMessages[
                Math.floor(Math.random() * actionMessages.length)
              ];
            },
            en: (msg) => {
              const actionMessages = [
                `${msg.author} is sweating profusely. :sweat_drops:`,
                `It's hot in here! ${msg.author} starts sweating. :hot_face:`,
                `:hot_face: ${msg.author} is melting from the heat. :sweat_drops:`,
                `${msg.author} sweats like an athlete. :muscle:`,
                `A bit too much heat for ${msg.author}. :fire:`,
                `${msg.author} is all soaked in sweat. :sweat_drops:`,
              ];
              return actionMessages[
                Math.floor(Math.random() * actionMessages.length)
              ];
            },
          },
        },
        thumbsup: {
          description: {
            fr: "Donner un pouce levé.",
            en: "Give a thumbs up.",
          },
          usage: "thumbsup",
          getAction: {
            fr: (msg) => {
              const actionMessages = [
                `:thumbsup: ${msg.author} donne un pouce levé. :+1:`,
                `${msg.author} approuve avec un pouce levé. :+1:`,
                `:+1: ${msg.author} fait un signe positif avec son pouce. :thumbsup:`,
                `${msg.author} soutient d'un pouce levé. :+1:`,
                `:thumbsup: ${msg.author} est d'accord. :+1:`,
                `${msg.author} donne un pouce levé en signe d'approbation. :+1:`,
              ];
              return actionMessages[
                Math.floor(Math.random() * actionMessages.length)
              ];
            },
            en: (msg) => {
              const actionMessages = [
                `:thumbsup: ${msg.author} gives a thumbs up. :+1:`,
                `${msg.author} approves with a thumbs up. :+1:`,
                `:+1: ${msg.author} gives a positive sign with their thumb. :thumbsup:`,
                `${msg.author} supports with a thumbs up. :+1:`,
                `:thumbsup: ${msg.author} agrees. :+1:`,
                `${msg.author} gives a thumbs up as a sign of approval. :+1:`,
              ];
              return actionMessages[
                Math.floor(Math.random() * actionMessages.length)
              ];
            },
          },
        },
        tickle: {
          description: {
            fr: "Chatouiller quelqu'un.",
            en: "Tickle someone.",
          },
          usage: "tickle <user>",
          getAction: {
            fr: (msg, target) => {
              const actionMessages = [
                `:laughing: ${msg.author} chatouille ${target} ! :grin:`,
                `${msg.author} chatouille ${target} et provoque des rires ! :joy:`,
                `:joy: ${msg.author} fait rire ${target} en le chatouillant. :laughing:`,
                `${msg.author} chatouille ${target} avec succès ! :grinning:`,
                `:grinning: ${msg.author} amuse ${target} en le chatouillant. :joy:`,
                `${msg.author} chatouille ${target} jusqu'à ce que ça devienne incontrôlable ! :laughing:`,
              ];
              return actionMessages[
                Math.floor(Math.random() * actionMessages.length)
              ];
            },
            en: (msg, target) => {
              const actionMessages = [
                `:laughing: ${msg.author} tickles ${target}! :grin:`,
                `${msg.author} tickles ${target} and triggers laughter! :joy:`,
                `:joy: ${msg.author} makes ${target} laugh by tickling them. :laughing:`,
                `${msg.author} successfully tickles ${target}! :grinning:`,
                `:grinning: ${msg.author} amuses ${target} by tickling them. :joy:`,
                `${msg.author} tickles ${target} until it becomes uncontrollable! :laughing:`,
              ];
              return actionMessages[
                Math.floor(Math.random() * actionMessages.length)
              ];
            },
          },
        },
        tired: {
          description: {
            fr: "Exprimer la fatigue.",
            en: "Express tiredness.",
          },
          usage: "tired",
          getAction: {
            fr: (msg) => {
              const actionMessages = [
                `${msg.author} est épuisé. :weary:`,
                `:weary: ${msg.author} a vraiment besoin de repos. :sleeping:`,
                `${msg.author} se sent fatigué. :tired_face:`,
                `C'est le moment de la sieste pour ${msg.author}. :zzz:`,
                `${msg.author} ne peut plus continuer. :dizzy_face:`,
                `:dizzy_face: ${msg.author} est complètement épuisé. :zzz:`,
              ];
              return actionMessages[
                Math.floor(Math.random() * actionMessages.length)
              ];
            },
            en: (msg) => {
              const actionMessages = [
                `${msg.author} is exhausted. :weary:`,
                `:weary: ${msg.author} really needs some rest. :sleeping:`,
                `${msg.author} feels tired. :tired_face:`,
                `It's nap time for ${msg.author}. :zzz:`,
                `${msg.author} can't go on anymore. :dizzy_face:`,
                `:dizzy_face: ${msg.author} is completely worn out. :zzz:`,
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
        woah: {
          description: {
            fr: "Exprimer l'étonnement.",
            en: "Express amazement.",
          },
          usage: "woah",
          getAction: {
            fr: (msg) => {
              const actionMessages = [
                `Woah, ${msg.author} est vraiment étonné. :astonished:`,
                `${msg.author} sursaute d'étonnement. :scream:`,
                `:scream: ${msg.author} est complètement stupéfait. :astonished:`,
                `${msg.author} est choqué. :open_mouth:`,
                `${msg.author} avec une expression surprise ! :astonished:`,
                `${msg.author} est époustouflé au-delà des mots. :exploding_head:`,
              ];
              return actionMessages[
                Math.floor(Math.random() * actionMessages.length)
              ];
            },
            en: (msg) => {
              const actionMessages = [
                `Oh my goodness! ${msg.author} is really surprised. :astonished:`,
                `${msg.author} jumps in surprise. :scream:`,
                `:scream: ${msg.author} is completely astonished. :astonished:`,
                `${msg.author} is shocked. :open_mouth:`,
                `${msg.author} with a surprised expression! :astonished:`,
                `${msg.author} is amazed beyond words. :exploding_head:`,
              ];
              return actionMessages[
                Math.floor(Math.random() * actionMessages.length)
              ];
            },
          },
        },
        yawn: {
          description: {
            fr: "Bailler.",
            en: "Yawn.",
          },
          usage: "yawn",
          getAction: {
            fr: (msg) => {
              const actionMessages = [
                `${msg.author} baille en signe de fatigue. :yawning_face:`,
                `:yawning_face: ${msg.author} a vraiment besoin de sommeil. :sleeping:`,
                `${msg.author} se sent fatigué et baille. :zzz:`,
                `C'est l'heure de la sieste pour ${msg.author}. :sleepy:`,
                `${msg.author} ne peut plus cacher son bâillement. :weary:`,
                `:weary: ${msg.author} baille de manière contagieuse. :sleeping:`,
              ];
              return actionMessages[
                Math.floor(Math.random() * actionMessages.length)
              ];
            },
            en: (msg) => {
              const actionMessages = [
                `${msg.author} yawns as a sign of tiredness. :yawning_face:`,
                `:yawning_face: ${msg.author} really needs some sleep. :sleeping:`,
                `${msg.author} feels tired and yawns. :zzz:`,
                `It's nap time for ${msg.author}. :sleepy:`,
                `${msg.author} can't hide the yawn anymore. :weary:`,
                `:weary: ${msg.author} yawns in a contagious manner. :sleeping:`,
              ];
              return actionMessages[
                Math.floor(Math.random() * actionMessages.length)
              ];
            },
          },
        },
        yay: {
          description: {
            fr: "Exprimer l'excitation.",
            en: "Express excitement.",
          },
          usage: "yay",
          getAction: {
            fr: (msg) => {
              const actionMessages = [
                `Hourra ! ${msg.author} est super excité ! :tada:`,
                `${msg.author} saute de joie ! :confetti_ball:`,
                `:tada: ${msg.author} est en folie de bonheur ! :partying_face:`,
                `${msg.author} exprime son excitation ! :fireworks:`,
                `:fireworks: ${msg.author} est prêt à faire la fête ! :confetti_ball:`,
                `${msg.author} crie de joie ! :tada:`,
              ];
              return actionMessages[
                Math.floor(Math.random() * actionMessages.length)
              ];
            },
            en: (msg) => {
              const actionMessages = [
                `Hooray! ${msg.author} is super excited! :tada:`,
                `${msg.author} jumps for joy! :confetti_ball:`,
                `:tada: ${msg.author} is in a happiness frenzy! :partying_face:`,
                `${msg.author} expresses excitement! :fireworks:`,
                `:fireworks: ${msg.author} is ready to party! :confetti_ball:`,
                `${msg.author} shouts with joy! :tada:`,
              ];
              return actionMessages[
                Math.floor(Math.random() * actionMessages.length)
              ];
            },
          },
        },
        yes: {
          description: {
            fr: "Dire oui.",
            en: "Say yes.",
          },
          usage: "yes",
          getAction: {
            fr: (msg) => {
              const actionMessages = [
                `:white_check_mark: ${msg.author} dit oui avec enthousiasme !`,
                `${msg.author} accepte volontiers. :thumbsup:`,
                `:thumbsup: ${msg.author} est d'accord !`,
                `${msg.author} répond positivement. :+1:`,
                `:white_check_mark: ${msg.author} donne son accord !`,
                `${msg.author} est tout à fait d'accord ! :thumbsup:`,
              ];
              return actionMessages[
                Math.floor(Math.random() * actionMessages.length)
              ];
            },
            en: (msg) => {
              const actionMessages = [
                `:white_check_mark: ${msg.author} enthusiastically says yes!`,
                `${msg.author} gladly agrees. :thumbsup:`,
                `:thumbsup: ${msg.author} is on board!`,
                `${msg.author} responds positively. :+1:`,
                `:white_check_mark: ${msg.author} gives their approval!`,
                `${msg.author} is all in! :thumbsup:`,
              ];
              return actionMessages[
                Math.floor(Math.random() * actionMessages.length)
              ];
            },
          },
        },
      },
    },
  },
};
module.exports = messages;

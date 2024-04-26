// @ts-nocheck

import PhraseNo from "./PhraseNo";
import WordNo from "./WordNo";
import Sentence from "./Sentence";
import LoadingSpinner from "../LoadingSpinner";
import Context from "./Context";

const mockDataFromApi = {
  word: {
    word: "share",
    phoneticSymbols: {
      british: "/ʃeər/",
      american: "/ʃer/",
      australian: "/ʃeə/",
    },
    entries: [
      {
        partOfSpeech: "verb",
        definitions: [
          {
            definition: "divide and distribute in shares; apportion.",
            example: "they shared the profits equally",
            translation: "分享",
          },
          {
            definition: "have a portion of (something) in common with others.",
            example: "we share the same birthday",
            translation: "共享",
          },
          {
            definition:
              "allow someone else to use or enjoy (something) jointly.",
            example: "she shared her sweets with the other children",
            translation: "分享",
          },
        ],
      },
      {
        partOfSpeech: "noun",
        definitions: [
          {
            definition:
              "a portion belonging to, distributed to, or contributed by a person or group.",
            example: "each employee was given a share of the profits",
            translation: "股份",
          },
          {
            definition:
              "a part or portion of a larger amount that is divided among a number of people, groups, or things.",
            example: "she took her share of the blame",
            translation: "份額",
          },
          {
            definition: "a unit of ownership in a company or financial asset.",
            example: "he bought 100 shares in the company",
            translation: "股票",
          },
        ],
      },
    ],
    note: "The word 'share' is a versatile term that can be used as both a verb and a noun. As a verb, it means to divide, distribute, or allow others to use something jointly. As a noun, it refers to a portion, part, or unit of ownership in something. The word is commonly used in various contexts, such as business, finance, and everyday life.",
  },
  phrase: {
    phrase: "Taking the plunge",
    definition:
      "To take a risk or make a bold decision, often to start something new or make a significant change in one's life.",
    translation: "勇敢跨出一步",
    regionAndFrequency: {
      american: 7,
      british: 6,
      australian: 5,
    },
    contexts: [
      {
        context: "Discussing a major life decision",
        usage:
          "After years of thinking about it, she finally took the plunge and started her own business.",
      },
      {
        context: "Describing a spontaneous action",
        usage:
          "I was nervous, but I just took the plunge and asked my boss for a raise.",
      },
      {
        context: "Encouraging someone to make a change",
        usage:
          "You've been talking about going back to school for ages, why don't you just take the plunge and enroll?",
      },
    ],
    synonyms: ["take the leap", "dive in", "make the jump"],
    antonyms: ["play it safe", "hesitate", "hold back"],
    note: "This idiom suggests a sense of courage, determination, and a willingness to take risks in order to achieve something new or different.",
  },
  sentence: {
    sentence: "It just goes to show how much behind the curve we all are.",
    translation: "这正是表明我们所有人都有多落后",
    thoughtGroups: [
      {
        text: "It just goes to show",
        explanation:
          "This phrase is used to emphasize that something clearly demonstrates a fact or situation.",
      },
      {
        text: "how much behind the curve",
        explanation:
          "Being 'behind the curve' means being slower than others to understand, adapt to, or adopt something.",
      },
      {
        text: "we all are",
        explanation:
          "In this case, 'we all' suggests that everyone or a large group of people are lagging behind in some way.",
      },
    ],
    overallExplanation:
      "The sentence emphasizes that a particular situation or piece of information clearly demonstrates how a group of people, possibly including the speaker, are not up-to-date, informed, or adaptive to a particular trend, technology, or way of thinking.",
    distilledExpressions: [
      {
        expression: "It just goes to show",
        definition:
          "This phrase is used to highlight that something is a clear example or proof of a particular fact or situation.",
      },
      {
        expression: "behind the curve",
        definition:
          "Slower than others to understand, adapt to, or adopt a new idea, trend, technology, or way of thinking.",
      },
    ],
  },
  wordC: {
    lexicalItem: "advocate",
    context:
      "Eliza Hull is a musician, writer and disability advocate based in Victoria.",
    meaning:
      "A person who publicly supports or recommends a particular cause or policy.",
    translation: "倡導者",
    example:
      "She is a strong advocate for environmental protection and sustainable practices.",
    partOfSpeech: "Noun",
    phoneticSymbols: {
      british: "/ˈadvəkət/",
      american: "/ˈædvəkət/",
      australian: "/ˈadvəkət/",
    },
    register: "Neutral",
    regionAndFrequency: {
      british: 8,
      american: 7,
      australian: 7,
    },
    relations: {
      synonyms: ["supporter", "backer", "proponent"],
      antonyms: ["opponent", "critic", "adversary"],
      commonCollocations: [
        "human rights advocate",
        "political advocate",
        "social justice advocate",
      ],
      note: "In the given context, 'disability advocate' refers to a person who publicly supports and promotes the rights and interests of people with disabilities.",
    },
  },
  phraseC: {
    lexicalItem: "During our stay",
    contextSentence:
      "During our stay, I decided to treat myself to a foot scrub, which is something I normally stay clear of for fear of stigma.",
    phoneticSymbols: {
      british: "/ˈdjʊərɪŋ aʊə steɪ/",
      american: "/ˈdʊrɪŋ aʊr steɪ/",
      australian: "/ˈdjʊərɪŋ aʊə steɪ/",
    },
    meaning:
      "The period of time when the speaker was in a particular location or place.",
    translation:
      "在我們住宿期間,我決定讓自己享受一次足部去角質,這是我平常會避免的事情,因為擔心會受到歧視。",
    example:
      "During our vacation in Hawaii, we visited several beaches and tried lots of local cuisine.",
    partOfSpeech: "Prepositional Phrase",
    register: "Neutral",
    regionAndFrequency: {
      british: 8,
      american: 8,
      australian: 8,
    },
    relations: {
      synonyms: [
        "while we were there",
        "throughout our stay",
        "over the course of our visit",
      ],
      antonyms: [],
      commonCollocations: [
        "during our trip",
        "during our holiday",
        "during our time there",
      ],
    },
    note: "This prepositional phrase refers to the period of time when the speaker was in a particular location or place, in this case during their stay or visit somewhere. It provides context for the actions and events that occurred during that time period.",
  },
};
// const data = mockDataFromApi.sentence;

// Make sure the path is correct based on your project structure

function DictionaryEntry({dicData}) {
  if (!dicData) {
    return <LoadingSpinner />;
  }
  console.log("dicData.phrase: ", dicData.phrase);
  console.log("dicData.word: ", dicData.word);
  console.log("dicData.sentence: ", dicData.sentence);
  console.log("dicData.lexicalItem: ", dicData.lexicalItem);
  
  return (
    <div id="allowSelection">
      {dicData.phrase && <PhraseNo data={dicData} isShowedTran={true} />}
      {dicData.word && <WordNo data={dicData} isShowedTran={true} />}
      {dicData.sentence && <Sentence data={dicData} isShowedTran={true} />}
      {dicData.lexicalItem && <Context dicData={dicData} isShowedTran={true} />}
    </div>
  );
}


export default DictionaryEntry;

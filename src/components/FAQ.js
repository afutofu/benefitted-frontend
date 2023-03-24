import React, { useEffect, useContext } from "react";
import styled from "styled-components";
import parse from "react-html-parser";
import { gsap, TimelineLite, Power3 } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { LanguageContext } from "../contexts/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

const FAQComp = styled.section`
  width: 100%;
  height: 100%;
  padding: 20vh 0;
  display: flex;
  justify-content: center;
  align-items: flex-start;

  @media only screen and (max-width: 992px) {
    padding: 15vh 0;
  }
`;

const Container = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media only screen and (max-width: 600px) {
    width: 70%;
  }
`;

const QA = styled.div`
  width: 100%;
  text-align: center;
  margin-bottom: 45px;
  font-size: 14px;

  @media only screen and (max-width: 1200px) {
    font-size: 13px;
  }

  @media only screen and (max-width: 992px) {
    font-size: 12px;
  }
`;

const Question = styled.h3`
  margin: 0;
  margin-bottom: 5px;
  font-weight: 600;
  line-height: 1.5em;
`;

const Answer = styled.p`
  line-height: 1.7em;
  margin: 0;

  a {
    box-sizing: border-box;
    text-decoration: none;
    color: black;
    font-weight: 500;
    border-bottom: #d3c092 4px solid;

    :hover {
      border-bottom: #e2d6c0 4px solid;
    }
  }
`;

const qas = [
  {
    question: "Do we need to get the shoes ourselves ?",
    questionIndo: "Apakah kita perlu mendapatkan sepatu itu sendiri ?",
    answer:
      "Yes, you can send in your own shoes or we can purchase new ones for you (by request).",
    answerIndo:
      "Ya, Anda dapat mengirimkan sepatu Anda sendiri atau kami dapat membeli yang baru untuk Anda (berdasarkan permintaan).",
  },
  {
    question: "Where do you buy the shoes ?",
    questionIndo: "Di mana Anda membeli sepatu ?",
    answer:
      "We source the shoes from reputable sellers - <a href='https://www.instagram.com/bootsdept_id/' target='blank'>@bootsdept_id</a>, <a href='https://www.instagram.com/807garage.id/' target='blank'>@807garage.id</a>, <a href='https://www.instagram.com/shoebite_/' target='blank'>@shoebite_</a> - that  guarantees authentic shoes.",
    answerIndo:
      "Kami mencari sepatu dari penjual terkemuka - <a href='https://www.instagram.com/bootsdept_id/' target='blank'> @bootsdept_id</a>, <a href = 'https: // www. instagram.com/807garage.id/ 'target =' blank '> @ 807garage.id</a>, <a href='https://www.instagram.com/shoebite_/' target='blank'> @shoebite_ </a> - yang menjamin sepatu asli.",
  },
  {
    question: "What are the prices for the shoes ?",
    questionIndo: "Berapa harga sepatu itu ?",
    answer:
      "Our customs start at Rp.175,000 for the simplest designs and go up with harder designs. DM us for a more detailed price list.",
    answerIndo:
      "Bea cukai kami mulai dari Rp175.000 untuk desain paling sederhana dan naik dengan desain yang lebih sulit. DM kami untuk daftar harga yang lebih detail.",
  },
  {
    question: "Do you ship internationally ?",
    questionIndo: "Apakah Anda mengirim secara internasional ?",
    answer:
      "For now, we only ship within Indonesia. Hopefully in the future though!",
    answerIndo:
      "Untuk saat ini, kami hanya melakukan pengiriman di Indonesia. Semoga di masa depan!",
  },
  {
    question: "Can I request my own pictures to custom ?",
    questionIndo:
      "Bisakah saya meminta gambar saya sendiri untuk disesuaikan ?",
    answer:
      "Yes, we can make a digital design for you. Just send us a reference pic and we'll work on it.",
    answerIndo:
      "Ya, kami dapat membuatkan desain digital untuk Anda. Kirimkan saja kepada kami gambar referensi dan kami akan mengerjakannya.",
  },
  {
    question: "Do you accept things other than shoes? Like bags or wallets ?",
    questionIndo:
      "Apakah Anda menerima barang selain sepatu? Seperti tas atau dompet ?",
    answer:
      "Yep. We accept shoes, bags and wallets as long as they're leather / canvas.",
    answerIndo:
      "Ya. Kami menerima sepatu, tas dan dompet asalkan terbuat dari bahan kulit / kanvas.",
  },
  {
    question: "What type of shoes do you accept ?",
    questionIndo: "Jenis sepatu apa yang Anda terima ?",
    answer: "We accept any LEATHER and CANVAS shoes.",
    answerIndo: "Kami menerima sepatu KULIT dan KANVAS.",
  },
  {
    question: "How do we book a slot ?",
    questionIndo: "Bagaimana cara kami memesan slot ?",
    answer:
      "We'll book a slot for you once you've confirmed your design and filled out the order format. We update the availability of our slots per week on our <a href='https://www.instagram.com/benefitted.id/' target='blank'>instagram bio</a>. So keep an eye on that and book yours before its over!",
    answerIndo:
      "Kami akan memesan slot untuk Anda setelah Anda mengonfirmasi desain dan mengisi format pesanan. Kami memperbarui ketersediaan slot kami per minggu di <a href = 'https: //www.instagram.com/benefitted .id / 'target =' blank '>bio instagram</a>. Jadi pantau terus dan pesan biografi Anda sebelum selesai!",
  },
  {
    question: "How much are reflectives ?",
    questionIndo: "Reflektif berapa harganya ?",
    answer:
      "Our reflectives start at Rp.200,000, and painted customs are more expensive with harder designs.",
    answerIndo:
      "Reflektif kami mulai dari Rp.200.000, dan bea cukai lebih mahal dengan desain yang lebih keras.",
  },
  {
    question: "Do you sell beads separately ?",
    questionIndo: "Apakah Anda menjual manik-manik secara terpisah ?",
    answer: "Yes we do! Just DM us the words and color scheme that you want.",
    answerIndo:
      "Ya kami lakukan! Cukup DM kami kata-kata dan skema warna yang Anda inginkan.",
  },
];

let qaRefs = [];
const FAQ = () => {
  // Retreive language from LanguageContext
  const [language] = useContext(LanguageContext);

  // Give each QA ref an animation. Fades in.
  const qaEnter = (qaRef) => {
    let tl = new TimelineLite({
      scrollTrigger: {
        trigger: qaRef,
        toggleActions: "play none none none",
        start: "top center+=200",
      },
    });

    tl.from(qaRef, {
      autoAlpha: 0,
      duration: 1,
      ease: Power3.easeOut,
    });

    return tl;
  };

  // Initialize each QA ref with an animation once components are mounted
  useEffect(() => {
    qaRefs.forEach((qaRef) => {
      qaEnter(qaRef);
    });
  }, []);

  return (
    <FAQComp id="faq">
      <Container>
        {qas.map((qa, i) => {
          return (
            // Add each ref into qaRefs array
            <QA key={i} ref={(el) => (qaRefs[i] = el)}>
              <Question>
                {language === "english" ? qa.question : qa.questionIndo}
              </Question>
              <Answer>
                {language === "english"
                  ? parse(qa.answer)
                  : parse(qa.answerIndo)}
              </Answer>
            </QA>
          );
        })}
      </Container>
    </FAQComp>
  );
};

export default FAQ;

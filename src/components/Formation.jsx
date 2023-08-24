import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";

import "react-vertical-timeline-component/style.min.css";

import { styles } from "../styles";
import { formations } from "../constants";
import { SectionWrapper } from "../hoc";
import { textVariant } from "../utils/motion";

const FormationCard = ({ formation, formationI18n }) => {
  return (
    <VerticalTimelineElement
      contentStyle={{
        background: "#1d1836",
        color: "#fff",
      }}
      contentArrowStyle={{ borderRight: "7px solid  #232631" }}
      date={formation.date}
      iconStyle={{ background: formation.iconBg }}
      icon={
        <div className="flex justify-center items-center w-full h-full">
          <img
            src={formation.icon}
            alt={formationI18n.company_name}
            className="w-[60%] h-[60%] object-contain"
          />
        </div>
      }
    >
      <div>
        <h3 className="text-white text-[24px] font-bold">{formation.title}</h3>
        <p
          className="text-secondary text-[16px] font-semibold"
          style={{ margin: 0 }}
        >
          {formationI18n.company_name}
        </p>
      </div>

      <ul className="mt-5 list-disc ml-5 space-y-2">
        <li
          key={`formation-point`}
          className="text-white-100 text-[14px] pl-1 tracking-wider"
        >
          {formationI18n.points}
        </li>
      </ul>
    </VerticalTimelineElement>
  );
};

const Formation = () => {
  const { t } = useTranslation();
  const formationsListI18n = t("formation.list", { returnObjects: true });

  console.log(formationsListI18n);
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} text-center`}>
          {t("formation.subtitle")}
        </p>
        <h2 className={`${styles.sectionHeadText} text-center`}>
          {t("formation.title")}
        </h2>
      </motion.div>

      <div className="mt-20 flex flex-col">
        <VerticalTimeline>
          {formations.map((formation, index) => (
            <FormationCard
              key={`formation-${index}`}
              formation={formation}
              formationI18n={formationsListI18n[index]}
            />
          ))}
        </VerticalTimeline>
      </div>
    </>
  );
};

export default SectionWrapper(Formation, "formation");

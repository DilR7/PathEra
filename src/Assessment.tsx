import React, { useState, ChangeEvent, useEffect, FormEvent } from "react";
import { HiInformationCircle } from "react-icons/hi2";
import MainLayout from "./layout/MainLayout";
import axios from "axios";
import { BASE_URL } from "./config/settings";
import { SkillType } from "./types/SkillType";
import { RadioGroup, RadioGroupItem } from "./components/ui/radio-group";

const Assessment: React.FC = () => {
  const [skills, setSkills] = useState<SkillType[]>([]);
  const [selectedJobTitles, setSelectedJobTitles] = useState<string[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedExperiences, setSelectedExperiences] = useState<string[]>([]);
  const [inputValueJobTitles, setInputValueJobTitles] = useState<string>("");
  const [inputValueSkills, setInputValueSkills] = useState<string>("");
  const [inputValueExperience, setInputValueExperience] = useState<string>("");
  const [degree, setDegree] = useState<string>("No Degree");
  const [suggestionsSkills, setSuggestionsSkills] = useState<SkillType[]>([]);

  const handleInputChangeJobTitles = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValueJobTitles(e.target.value);
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleAddJobTitle();
  };

  const handleInputChangeSkills = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValueSkills(value);
    if (value.length >= 1) {
      const filteredSuggestions = skills.filter((skill) =>
        skill.skill_name.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestionsSkills(filteredSuggestions);
    } else {
      setSuggestionsSkills([]);
    }
  };

  const handleInputChangeExperiences = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValueExperience(e.target.value);
  };

  const handleAddJobTitle = () => {
    if (inputValueJobTitles.trim() !== "" && inputValueJobTitles.length > 2) {
      setSelectedJobTitles((prev) => [...prev, inputValueJobTitles]);
      setInputValueJobTitles("");
    }
  };

  const handleAddSkill = (skill: string) => {
    if (!selectedSkills.includes(skill)) {
      setSelectedSkills((prev) => [...prev, skill]);
      setInputValueSkills("");
      setSuggestionsSkills([]);
    }
  };

  const handleAddExperience = () => {
    if (inputValueExperience.trim() !== "") {
      setSelectedExperiences((prev) => [...prev, inputValueExperience]);
      setInputValueExperience("");
    }
  };

  const handleRemoveTitleJobTitles = (title: string) => {
    setSelectedJobTitles(
      selectedJobTitles.filter((jobTitle) => jobTitle !== title)
    );
  };

  const handleRemoveTitleSkills = (skill: string) => {
    setSelectedSkills(
      selectedSkills.filter((skillTitle) => skillTitle !== skill)
    );
  };

  const handleRemoveExperiences = (experience: string) => {
    setSelectedExperiences(
      selectedExperiences.filter(
        (experienceTitle) => experienceTitle !== experience
      )
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/skills`);
        setSkills(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <MainLayout>
      <div className="px-8 md:px-24 py-8">
        <div className="bg-primary text-white px-4 md:px-16 py-8 rounded-lg w-full mt-12">
          <h1 className="text-center text-3xl font-bold mb-4">
            Jobs Questionnaire
          </h1>
          <p className="text-center mb-6">
            Take our questionnaire so that we can determine which jobs fit you
            the most
          </p>
          <form onSubmit={handleFormSubmit}>
            <div className="mb-6">
              <label className="block text-lg font-semibold mb-2">
                Your Job Titles
              </label>
              <div className="relative flex">
                <input
                  type="text"
                  value={inputValueJobTitles}
                  onChange={handleInputChangeJobTitles}
                  placeholder="Enter a job title"
                  className="w-full p-2 text-black rounded-l-md border border-r-0 border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300"
                />

                <button
                  type="submit"
                  className="px-4 py-2 bg-white text-primary font-semibold rounded-r-md border border-gray-300 hover:bg-gray-200 transition-colors duration-300"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {selectedJobTitles.map((title) => (
                  <span
                    key={title}
                    className="bg-white text-black py-1 px-3 rounded-sm cursor-pointer flex items-center"
                  >
                    {title}
                    <span
                      onClick={() => handleRemoveTitleJobTitles(title)}
                      className="ml-2 text-red-500 font-bold cursor-pointer"
                    >
                      &times;
                    </span>
                  </span>
                ))}
              </div>
            </div>
          </form>
          <div className="mb-6">
            <label className="block text-lg font-semibold mb-2">
              Years of Experience
            </label>
            <input
              type="number"
              placeholder="5"
              className="w-full p-2 text-black rounded-l-md border border-r-0 border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300"
            />
          </div>
          <div className="mb-6">
            <label className="block text-lg font-semibold mb-2">
              Your Skills
            </label>
            <div className="relative flex">
              <input
                type="text"
                value={inputValueSkills}
                onChange={handleInputChangeSkills}
                placeholder="Start typing your skills"
                className="w-full p-2 text-black rounded-l-md border border-r-0 border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300"
              />
            </div>
            {suggestionsSkills.length > 0 && (
              <ul className="absolute z-10 bg-white text-black w-full border border-gray-300 rounded mt-1 max-h-60 overflow-auto">
                {suggestionsSkills.map((skill) => (
                  <li
                    key={skill.id}
                    onClick={() => handleAddSkill(skill.skill_name)}
                    className="p-2 cursor-pointer hover:bg-gray-200"
                  >
                    {skill.skill_name}
                  </li>
                ))}
              </ul>
            )}
            <div className="flex flex-wrap gap-2 my-2">
              {selectedSkills.map((skill) => (
                <span
                  key={skill}
                  className="bg-white text-black py-1 px-3 rounded-sm cursor-pointer flex items-center"
                >
                  {skill}
                  <span
                    onClick={() => handleRemoveTitleSkills(skill)}
                    className="ml-2 text-red-500 font-bold cursor-pointer text-xl"
                  >
                    &times;
                  </span>
                </span>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <HiInformationCircle />
              <p>Fill out as many as you can</p>
            </div>
          </div>
          <div className="mb-6">
            <label className="block text-lg font-semibold mb-2">Degree</label>
            <RadioGroup
              className="grid grid-cols-1 sm:grid-cols-3 gap-2"
              value={degree}
              onValueChange={setDegree}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  className="w-6 h-6 border-2 border-white-500 text-white-500 focus:ring-white-500"
                  value="No Degree"
                  id="no-degree"
                />
                <label htmlFor="no-degree" className="text-white">
                  No Degree
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  className="w-6 h-6 border-2 border-white-500 text-white-500 focus:ring-white-500"
                  value="Bachelor"
                  id="bachelor"
                />
                <label htmlFor="bachelor" className="text-white">
                  Bachelor
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  className="w-6 h-6 border-2 border-white-500 text-white-500 focus:ring-white-500"
                  value="Master"
                  id="master"
                />
                <label htmlFor="master" className="text-white">
                  Master
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  className="w-6 h-6 border-2 border-white-500 text-white-500 focus:ring-white-500"
                  value="MBA"
                  id="mba"
                />
                <label htmlFor="mba" className="text-white">
                  MBA
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  className="w-6 h-6 border-2 border-white-500 text-white-500 focus:ring-white-500"
                  value="PhD"
                  id="phd"
                />
                <label htmlFor="phd" className="text-white">
                  PhD
                </label>
              </div>
            </RadioGroup>
          </div>
          <div className="mb-6">
            <label className="block text-lg font-semibold mb-2">
              Your Experiences
            </label>
            <div className="relative flex">
              <input
                type="text"
                value={inputValueExperience}
                onChange={handleInputChangeExperiences}
                placeholder="Created an application that uses AI for talent growth"
                className="w-full p-2 text-black rounded-l-md border border-r-0 border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300"
              />
              <button
                type="button"
                onClick={handleAddExperience}
                className="px-4 py-2 bg-white text-primary font-semibold rounded-r-md border border-gray-300 hover:bg-gray-200 transition-colors duration-300"
              >
                Add
              </button>
            </div>
            <div className="mt-2">
              {selectedExperiences.map((experience) => (
                <div
                  key={experience}
                  className="flex justify-between mt-2 bg-white w-full text-black py-1 px-3 rounded-sm cursor-pointer items-center"
                  style={{
                    overflowWrap: "break-word",
                    wordBreak: "break-word",
                  }}
                >
                  {experience}
                  <span
                    onClick={() => handleRemoveExperiences(experience)}
                    className="ml-1 text-red-500 font-bold cursor-pointer"
                  >
                    &times;
                  </span>
                </div>
              ))}
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-primary text-white py-2 px-4 rounded hover:bg-primary/90 transition-all duration-300 hover:text-white/60"
          >
            Submit Job Questionnaire
          </button>
        </div>
      </div>
    </MainLayout>
  );
};

export default Assessment;

import * as React from "react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  imageSrc: string;
  company: string;
  applicants: number;
  role: string;
}

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  tags: string[];
  description: string;
}

interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  rate: string;
  postedDate: string;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "bg-white text-gray-900 shadow-sm mx-auto p-5 w-72 rounded-lg",
        className
      )}
      {...props}
    />
  )
);
Card.displayName = "Card";

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ role, imageSrc, company, applicants, className, ...props }, ref) => {
    const [isWishlisted, setIsWishlisted] = useState(false);

    const handleWishlistClick = () => {
      setIsWishlisted((prevState) => !prevState);
    };
    return (
      <div
        ref={ref}
        className={cn("flex justify-between items-center mb-2", className)}
        {...props}
      >
        <div className="flex items-center">
          <img
            src={imageSrc}
            alt={`${company} logo`}
            className="w-10 h-10 rounded-lg mr-2 p-2 bg-gray-100"
          />

          <div className="">
            <h4 className="text-sm font-semibold">{role}</h4>
            <span className=" text-sm text-gray-500">{company}</span>
            <span className="text-sm text-gray-500">
              {applicants} Applicants
            </span>
          </div>
        </div>
        <button
          onClick={handleWishlistClick}
          className={`text-xl ${
            isWishlisted ? "text-red-500" : "text-gray-600"
          }`}
        >
          {isWishlisted ? <FaHeart /> : <FaRegHeart />}
        </button>
      </div>
    );
  }
);
CardHeader.displayName = "CardHeader";

const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ tags, description, className, ...props }, ref) => {
    const tagStyles = [
      { bg: "bg-purple-200", text: "text-purple-900" },
      { bg: "bg-green-200", text: "text-green-900" },
      { bg: "bg-orange-200", text: "text-orange-900" },
    ];

    return (
      <div ref={ref} className={cn("mb-4", className)} {...props}>
        <div className="flex flex-wrap gap-2 mb-2 mt-4">
          {tags.map((tag, index) => {
            const { bg, text } = tagStyles[index] || { bg: "bg-gray-200", text: "text-gray-700" };

            return (
              <span
                key={index}
                className={cn(
                  bg,
                  text,
                  "px-3 py-1 rounded-lg text-xs font-semibold"
                )}
              >
                {tag}
              </span>
            );
          })}
        </div>
        <p className="text-gray-600 mt-4">{description}</p>
      </div>
    );
  }
);
CardContent.displayName = "CardContent";


const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ rate, postedDate, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex justify-between items-center mt-4 pt-4 border-t",
        className
      )}
      {...props}
    >
      <div className="flex text-lg font-semibold">{rate}<h1 className="text-gray-500 font-medium">/hr</h1></div>
      <div className="text-xs text-gray-500">Posted {postedDate}</div>
    </div>
  )
);
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardFooter, CardContent };
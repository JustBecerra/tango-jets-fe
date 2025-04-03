// import React from "react";
// import { Star, StarHalf } from "lucide-react";

// const StarRanking: React.FC<{ ranking: number }> = ({ ranking }) => {
//   // Ensure ranking is a valid number
//   const safeRanking = Number.isFinite(ranking) ? ranking : 0;

//   // Ensure ranking is between 0 and 5
//   const clampedRanking = Math.min(Math.max(safeRanking, 0), 5);

//   // Calculate full stars, half stars, and empty stars
//   const fullStars = Math.floor(clampedRanking);
//   const hasHalfStar = clampedRanking % 1 >= 0.5;
//   const emptyStars = Math.max(0, 5 - fullStars - (hasHalfStar ? 1 : 0));

//   return (
//     <div className="flex items-center space-x-1">
//       {/* Full stars */}
//       {fullStars > 0 &&
//         [...Array(fullStars)].map((_, index) => (
//           <Star
//             key={`full-${index}`}
//             className="text-yellow-500 w-5 h-5 fill-current"
//           />
//         ))}

//       {/* Half star */}
//       {hasHalfStar && (
//         <StarHalf className="text-yellow-500 w-5 h-5 fill-current" />
//       )}

//       {/* Empty stars */}
//       {emptyStars > 0 &&
//         [...Array(emptyStars)].map((_, index) => (
//           <Star key={`empty-${index}`} className="text-gray-300 w-5 h-5" />
//         ))}
//     </div>
//   );
// };

// export default StarRanking;
import React from "react";

interface StarRankingProps {
  ranking: number;
}

const StarRanking: React.FC<StarRankingProps> = ({ ranking }) => {
  // Ensure ranking is a valid number
  const safeRanking = Number.isFinite(ranking) ? ranking : 0;

  // Ensure ranking is between 0 and 5
  const clampedRanking = Math.min(Math.max(safeRanking, 0), 5);

  // Calculate full stars, half stars, and empty stars
  const fullStars = Math.floor(clampedRanking);
  const hasHalfStar = clampedRanking % 1 >= 0.5;
  const emptyStars = Math.max(0, 5 - fullStars - (hasHalfStar ? 1 : 0));

  return (
    <div className="flex items-center space-x-1">
      {/* Full stars */}
      {[...Array(fullStars)].map((_, index) => (
        <svg
          key={`full-${index}`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="w-5 h-5 text-yellow-500 fill-current"
        >
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      ))}

      {/* Half star */}
      {hasHalfStar && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="w-5 h-5 text-yellow-500 fill-current"
        >
          <path d="M22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.64-7.03L22 9.24zM12 15.4V6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z" />
        </svg>
      )}

      {/* Empty stars */}
      {[...Array(emptyStars)].map((_, index) => (
        <svg
          key={`empty-${index}`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="w-5 h-5 text-gray-300"
        >
          <path d="M22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.64-7.03L22 9.24zm-7.41 4.75l1.16 4.96-4.34-2.67-4.34 2.67 1.16-4.96-3.8-3.3 5-.42L12 5.45l1.94 4.72 5 .42-3.8 3.3z" />
        </svg>
      ))}
    </div>
  );
};

export default StarRanking;

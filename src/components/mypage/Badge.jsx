import React from 'react';
import badges from 'assets/images/badge';
import ReactTooltip from 'react-tooltip';

function Badge({ myBadge, badgeSetting }) {
  const successId = myBadge?.map((myBadge) => myBadge.id);

  return (
    <div>
      <div className="flex justify-center">
        <div className="grid w-11/12 grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 justify-items-center">
          {badgeSetting ? (
            <>
              {badges?.map((badge) => (
                <div
                  key={badge.id}
                  data-tip={badge.content}
                  data-for="myBadge"
                  className={`flex flex-col items-center justify-center ${
                    successId?.includes(badge.id) ? null : 'hidden'
                  }`}
                >
                  <img
                    className="w-20 h-20 bg-gray-100 rounded-full"
                    src={badge.image}
                    alt="badgeImage"
                  />
                  <span className="px-2 mt-2 text-sm shadow-xl rounded-3xl">{badge.title}</span>
                  <ReactTooltip id="myBadge" getContent={(dataTip) => `${dataTip}`} />
                </div>
              ))}
            </>
          ) : (
            <>
              {badges?.map((badge) => (
                <div
                  key={badge.id}
                  data-tip={badge.content}
                  data-for="myBadge"
                  className="flex flex-col items-center justify-center"
                >
                  <img
                    className={`w-20 h-20 bg-gray-100 rounded-full ${
                      successId?.includes(badge.id) ? null : 'grayscale'
                    }`}
                    src={badge.image}
                    alt="badgeImage"
                  />
                  <span className="px-2 mt-2 text-sm shadow-xl rounded-3xl">{badge.title}</span>
                  <ReactTooltip id="myBadge" getContent={(dataTip) => `${dataTip}`} />
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Badge;

export const getClassNames = (module) => {
  return (...classnames) => {
    let className = "";
    classnames.forEach((classname) => {
      if (!classname || typeof className != "string") {
        return;
      }
      if (!module[classname]) {
        className += ` ${classname}`;
        return;
      }
      className += ` ${module[classname]}`;
    });
    return className;
  };
};

export const arePathsEqual = (path1, path2) => {
  return path1 === path2;
};

export const productCategories = [
  { value: "electronics", label: "ELECTRONICS" },
  { value: "home_appliances", label: "HOME APPLIANCES" },
  { value: "sporting_goods", label: "SPORTING GOODS" },
  { value: "furniture", label: "FURNITURE" },
  { value: "outdoor", label: "OUTDOOR" },
  { value: "toys", label: "TOYS" },
];

export const rentalPeriods = [
  { value: "hourly", label: "hourly" },
  { value: "daily", label: "daily" },
  { value: "monthly", label: "monthly" },
];

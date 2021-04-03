const sorting = {
  DateSorting: function(items, index, isDesc) {
    items.sort((a, b) => {
      if (index[0] == "date") {
        if (!isDesc[0]) {
          return new Date(b[index]) - new Date(a[index]);
        } else {
          return new Date(a[index]) - new Date(b[index]);
        }
      } else {
        if (typeof a[index] !== "undefined") {
          if (!isDesc[0]) {
            return a[index].toLowerCase().localeCompare(b[index].toLowerCase());
          } else {
            return b[index].toLowerCase().localeCompare(a[index].toLowerCase());
          }
        }
      }
    });
    return items;
  }
};
export default sorting;

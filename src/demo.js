const submit = () => {
  if (!selectNum.value) return proxy.$tips.error("请选择要添加的章节");
  const list = state.uploadList.filter((key) =>
    state.realSelectedKeys.includes(key.key)
  ); // console.log(list, 'list');
  console.log("state.chapterOk", state.chapterOk);
  const prepareList = list.map((item) => {
    return {
      chapterTitle:
        item.chapterTitle.split("-").length >= 2
          ? item.chapterTitle.split("-")[1]
          : item.chapterTitle,
      content: item.content.toString(),
    };
  });
  let tenItemList = [];
  const preparelist = prepareList.map((item, index) => {
    tenItemList.push(item);
    if (tenItemList.length == 10) {
      state.tenList.push(tenItemList);
      tenItemList = [];
    } else if (prepareList.length - 1 == index) {
      state.tenList.push(tenItemList);
    }
  });
};

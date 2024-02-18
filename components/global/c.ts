// const { data } = await useAsyncData('soccerClub', () => {
//   return $fetch('/api/soccer_club/PL')
// })
const c = async (code: string[]) => {
let leagueData = [];
let leagueObj: Object = {};
for (let i = 0; i < code.length; i++) {
let { data: league, error } = await useAsyncData('leagueMenu_' + i + 1, () => {
return $fetch(`/api/soccer_club/${code[i]}`);
});
if (error) {
i = code.length;
} else {
leagueObj[`${code[i]}`] = league.value?.teams;
}
leagueData.push(Object.assign({}, leagueObj));
}
return leagueData;
};

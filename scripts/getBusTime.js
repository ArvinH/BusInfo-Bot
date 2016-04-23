module.exports = (robot) => {
	robot.hear(/echo (.*)/i, (res) => {
		robot.messageRoom(res.message.room, res.match[1]);
	});
}

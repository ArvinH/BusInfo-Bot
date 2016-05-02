var bus = require("./lib/taipeiBus");

module.exports = (robot) => {
	robot.hear(/get (.*) (.*)/i, (res) => {
		bus(res.match[1], function(err, data) {
			if (!err) {
				var result = data['back'].filter(function(item, i) {
					if (item.name === res.match[2]) {
						return item;
					}
				});
				robot.messageRoom(res.message.room, JSON.stringify(result));
				return;
			} 
			robot.messageRoom(res.message.room, "sorry, there are some problems..");
			return;
		});
	});
}

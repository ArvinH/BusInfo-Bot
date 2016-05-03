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
				result.map(function(item, i) {
					var assembleItem = {
						direction: (item.direction === 'go') ? '去程' : '回程',
						status: (item.status.indexOf('分') > -1) ? '還剩下' + item.status : item.status
					}
					robot.messageRoom(res.message.room, assembleItem.direction + ' ' + assembleItem.status);
				});
				return;
			} 
			robot.messageRoom(res.message.room, "sorry, there are some problems..");
			return;
		});
	});
}

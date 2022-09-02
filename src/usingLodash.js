const mapSchema = {
    item: {
        regulatory_name: "regulatory_name",
        regulatory_state: "regulatory_state",   
        sum_regulatory_passed_controls: "regulatory_passed_controls",
        sum_regulatory_failed_controls: "regulatory_failed_controls"
		
    }
};

const getDataTransformed = () => {
    var _ = require('lodash');
    const data = require('./data.json');
    let newData = _.uniqWith(data, (pre, cur) => {
        if (pre.regulatory_name == cur.regulatory_name) {
          cur.regulatory_passed_controls = cur.regulatory_passed_controls + pre.regulatory_passed_controls;
          cur.regulatory_failed_controls = cur.regulatory_failed_controls + pre.regulatory_failed_controls;
          if (pre.regulatory_state === 'Failed') {
            cur.regulatory_state = 'Failed';
          }
          return true;
        }
        return false;
      });

    const { transform } = require("node-json-transform");
    const result = transform(newData, mapSchema);
    console.log(result)
}

module.exports = {
    getDataTransformed
}
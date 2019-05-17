 sap.ui.define([], function () {
 	return {
 		formatDate: function (iDate) {
 			if (!iDate) {
 				return null;
 			}
 			return new Date(iDate);
 		}
 	};
 });
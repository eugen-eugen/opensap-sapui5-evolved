sap.ui.define(["sap/ui/core/mvc/Controller", 
    "sap/base/Log", 
    "../model/formatter",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/core/UIComponent",
    "sap/m/Toolbar"
    ], function (Controller, Log, Formatter, Filter, FilterOperator, UIComponent, Toolbar) {
	"use strict";
	return Controller.extend("moldsawski.movie.controller.App", {
		formatFunc: Formatter.formatDate,
		onInit: function () {},

		onPress: function (msg) {
			Log.info("Press");
			sap.ui.require(["sap/m/MessageToast"], function(oMessage, opt){
				var bundle=this.getOwnerComponent().getModel("i18n").getResourceBundle();
				oMessage.show(bundle.getText("search") + msg);
			}.bind(this));
		   var sCity = this.byId('city').getValue();
		   var sGenre = this.byId('genre').getSelectedItem().getKey();
		   var oCalendar = this.byId("calendar");
		   var oRowBinding = oCalendar.getBinding("rows");
		   var oFilterGenre, oFilterCity;

           oFilterGenre = sGenre?new Filter("genre", FilterOperator.EQ, sGenre):null;
           oFilterCity = sCity?new Filter("info", FilterOperator.Contains, sCity):null;
           
           oRowBinding.filter(oFilterGenre);
		   var aRows = oCalendar.getAggregation("rows");
		   aRows.forEach(function (oItem) {
		      var oAppointmentsBinding = oItem.getBinding("appointments");
		      oAppointmentsBinding.filter(oFilterCity);
		   });
		},
		onAppointmentSelect: function(oAppointment){
			var bBindingContext=oAppointment.getBindingContext("movies");
			var sPath=bBindingContext.getPath();
			var aParameters= sPath.split("/");
			UIComponent.getRouterFor(this).navTo("Detail", {
					movieId: aParameters[2], 
				    appointmentId: aParameters[4]
				}
			);
		}
	});
});
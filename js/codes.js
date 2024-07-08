/*
Definition, mapping and handling of Eurobase codes
*/


/*
ALL ABOUT COUNTRY CODES
*/
// List of all countries found in the energy prices dataset !!! LOOKUP TABLE !!!
// Labels are set in the language JSON files in the data folder 
energyCountries = {
	"EU27_2020": "",
	"EU28": "",
	"EA": "",
	"BE": "",
	"BG": "",
	"CZ": "",
	"DK": "",
	"DE": "",
	"EE": "",
	"IE": "",
	"EL": "",
	"ES": "",
	"FR": "",
	"HR": "",
	"IT": "",
	"CY": "",
	"LV": "",
	"LT": "",
	"LU": "",
	"HU": "",
	"MT": "",
	"NL": "",
	"AT": "",
	"PL": "",
	"PT": "",
	"RO": "",
	"SI": "",
	"SK": "",
	"FI": "",
	"SE": "",
	"UK": "",
	"IS": "",
	"NO": "",
	"LI": "",
	"ME": "",
	"MK": "",
	"AL": "",
	"RS": "",
	"TR": "",
	"XK": "",
	"UA": "",
	"MD": "",
	"BA": "",
	"GE": "",


};

mainFuelFamilies = [
	"TOTAL","C0000X0350-0370", "C0350-0370", "E7000", "S2000","G3000", "H8000", "N900H", "O4000XBIO", "P1000", "RA000", "W6100_6220"
]; 
coal = [
	// "C0000X0350-0370",
	"C0110",
	"C0121",
	"C0129",
	"C0210",
	"C0220",	
	"C0311",
	"C0312",
	"C0320",	
	"C0330",
	"C0340",
]; 

 units = [
	 "KTOE",
	 "GWH",
	 "TJ",
 ]
 
fossilBasedGasses = [ 
	"G3000",
	// "C0350-0370",
	"C0360",
	"C0350",
	"C0371",
	"C0379",
]
                 
otherFossilFuelsAndWastes = [ 
	"P1100",
	"P1200",
	"S2000",
	"W6100",
	"W6220",
]  

primaryOil = [
	"O4100_TOT",
	"O4200",
	"O4300",
	"O4400X4410",
	"O4500",
] 

mainPetroleumProducts = [
	"O4610",
	"O4630",
	"O4652XR5210B",
	"O4661XR5230B",
	"O4640",
	"O4671XR5220B",
	"O4680",
	"O4695",
] 

otherPetroleumProducts = [
	"O4620",
	"O4651",
	"O4653",
	"O4669",
	"O4691",
	"O4692",
	"O4694",
	"O4693",
	"O4699",
] 

nonCombustibleRenewables = [
	"RA100",
	"RA500",
	"RA300",
	"RA420",
	"RA410",
	"RA200",
	"RA600",
] 

combustibleRenewables = [
	"R5110-5150_W6000RI",
	"R5160",
	"R5300",
	"R5210P",
	"R5210B",
	"R5220P",
	"R5220B",
	"R5230P",
	"R5230B",
	"R5290",
	"W6210",
]

electricityAndHeat = [
	"N900H",
	"H8000",
	"E7000",
]

energyUnits = {
	"KTOE": "",
	"GWH": "",
	"TJ": "",
}

energyOrder = [
	"ALPHA",
	"ASC",
	"DESC",
	"PROTO",
]
energyDecimals = [
	"0",
	"0.0",
	"0.00",
	"0.000",
]

colors = [	
	'#388AE2',
	'#A5DAF9',
	'#80BFFA',
	'#104F99',
	'#208486',
	'#92C1C0',
	"#5FADAD",
	"#00525C",
	"#008BE6",
	"#F4F4F4",
	"#A1CBE6",
	"#5CAFE6",
	"#005C99",
]


codesEntable = {
	"geo": Object.keys(energyCountries),
	"unit": Object.keys(energyUnits),	
	"decimals": Object.keys(energyDecimals),	
	"year": [], // to be queried from Eurobase directly
};

defGeos = ["EU27_2020","BE","BG","CZ","DK","DE","EE","IE","EL","ES","FR","HR","IT","CY","LV","LT","LU","HU","MT","NL","AT","PL","PT","RO","SI","SK","FI","SE","IS","NO","ME","MK","AL","RS","TR","BA","XK","MD","UA","GE"]

balances = ["NRGSUP","TI_E","TO","NRG_E","DL","AFC","STATDIFF","FC_NE","FC_E","GEP","GHP",];
// balances = ["NRGSUP","TI_E","TO","NRG_E","TRANSL_DL","AFC","STATDIFF","FC_NE","FC_E","GEP","GHP",]; uncoment when trans_dl is set in the dataset
expandables = ["NRGSUP","TI_E","TO","NRG_E","FC_E","TI_EHG_E","TI_RPI_E","TO_EHG","FC_IND_E","FC_TRA_E","TO_RPI","FC_OTH_E"];

const allCountries = ["EU27_2020", "BE", "BG", "CZ", "DK", "DE", "EE", "IE", "EL", "ES", "FR", "HR", "IT", "CY", "LV", "LT", "LU", "HU", "MT", "NL", "AT", "PL", "PT", "RO", "SI", "SK", "FI", "SE", "IS", "LI", "NO", "ME", "MK", "AL", "RS", "TR", "BA", "XK", "MD", "UA", "GE"];

const AGGREGATES_COUNTRY_CODES = ["EU27_2020"].sort();

const EU_COUNTRY_CODES = [
	"AT", "BE", "BG", "CY", "CZ", "DE", "DK", "EE", "EL", "ES", "FI", "FR", 
	"HR", "HU", "IE", "IT", "LT", "LU", "LV", "MT", "NL", "PL", "PT", "RO", 
	"SE", "SI", "SK"
  ].sort();
  
  const EFTA_COUNTRY_CODES = ["IS", "LI", "NO"].sort();
  
  const ENLARGEMENT_COUNTRY_CODES = ["AL", "BA", "ME", "MK", "RS", "TR", "XK"].sort();
  
  const OTHER_THIRD_COUNTRY_CODES = ["MD", "UA", "GE"].sort();
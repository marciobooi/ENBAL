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
'#06D7FF',
'#19FF99',
'#4C99FF',
'#FFD900',
'#C88000',
'#33D129',
'#FFB800',

'#E67500',
'#05A0FF',
'#2CB523',
'#8C4000',
'#0033FF',
'#00A68C',
'#FF8C00',

'#00D98C',
'#2673FF',
'#FFB300',
'#FF8A00',
'#B35900',
'#26A31F',
'#0573FF',

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


 
  const AGGREGATES_COUNTRY_CODES = ["EU27_2020"];
  
  const EU_COUNTRY_CODES = [
	"BE","BG","CZ","DK","DE","EE","IE","EL","ES","FR","HR","IT","CY","LV","LT",
	"LU","HU","MT","NL","AT","PL","PT","RO","SI","SK","FI","SE"
  ]
  
  const EFTA_COUNTRY_CODES = [
	"IS", "LI", "NO"
  ]
  
  const ENLARGEMENT_COUNTRY_CODES = [
	 "BA","ME","MD","MK","GE","AL","RS","TR","UA","XK",
  ]
  
  const OTHER_THIRD_COUNTRY_CODES = [
	// "UA", "MD", "GE"
  ]
  
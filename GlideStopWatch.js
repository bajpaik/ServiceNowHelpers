/* hasnext + setlimit */

var stopwatch = new GlideStopWatch();
var tableName = 'task';
var filterString = 'active=true';
var answer = false;

var getRecord = new GlideRecord(tableName);
getRecord.addEncodedQuery(filterString);
getRecord.setLimit(1);
getRecord.query();

if (getRecord.hasNext()) { //hasnext would be faster
	answer = true;
}

gs.print('Timer: hasnext + setlimit->'+answer+'->'+stopwatch);


/* next + setlimit */

var stopwatch1 = new GlideStopWatch();
answer = false;

getRecord = new GlideRecord(tableName);
getRecord.addEncodedQuery(filterString);
getRecord.setLimit(1);
getRecord.query();

if (getRecord.next()) { 
	answer = true;
}

gs.print('Timer:next + setlimit->'+answer+'->'+stopwatch1);


/* next */
var stopwatch2 = new GlideStopWatch();
answer = false;

getRecord = new GlideRecord(tableName);
getRecord.addEncodedQuery(filterString);
getRecord.query();

if (getRecord.next()) {
	answer = true;
}

gs.print('Timer:next->'+answer+'->'+stopwatch2);


/* glideaggregate + addhaving */

var stopwatch3 = new GlideStopWatch();
answer = false;

getRecord = new GlideAggregate(tableName);
getRecord.addEncodedQuery(filterString);
getRecord.addAggregate('COUNT');
getRecord.addHaving('COUNT', '>', 0);
getRecord.query();

if (getRecord.next()) { 
	answer = true;
}

gs.print('Timer:glideaggregate + addhaving->'+answer+'->'+stopwatch3);


/* glideaggregate */

var stopwatch4 = new GlideStopWatch();
answer = false;

getRecord = new GlideAggregate(tableName);
getRecord.addEncodedQuery(filterString);
getRecord.addAggregate('COUNT');
getRecord.query();

if (getRecord.next() && getRecord.getAggregate('COUNT') > 0) { 
		answer = true;
}

gs.print('Timer:glideaggregate->'+answer+'->'+stopwatch4);


/* getRowCount */

var stopwatch5 = new GlideStopWatch();
answer = false;

getRecord = new GlideRecord(tableName);
getRecord.addEncodedQuery(filterString);
getRecord.query();

if(getRecord.getRowCount() > 0){
	answer = true;
}

gs.print('Timer:getRowCount->'+answer+'->'+stopwatch5);

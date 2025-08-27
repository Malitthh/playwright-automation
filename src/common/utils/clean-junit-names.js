const fs = require('fs');
const path = require('path');
const { DOMParser, XMLSerializer } = require('xmldom');
 
const REPORT_PATH = path.join(__dirname, '../../../reports/junit-final.xml');
const TEST_CASE_KEY_REGEX = /\b[A-Z]+-TC-\d+\b/;
const TAG_REGEX = /@\w+([-'_"()\w]*)*/g;
const STRAY_CHARS_REGEX = /[›•→–'"“”‘’]/g;
 
function cleanTestCaseName(originalName) {
  let name = originalName;
  const keyMatch = name.match(TEST_CASE_KEY_REGEX);
  if (keyMatch) {
    name = name.substring(name.indexOf(keyMatch[0]));
  }
  name = name.replace(TAG_REGEX, '');
  name = name.replace(STRAY_CHARS_REGEX, '');
  name = name.replace(/\s+/g, ' ').trim();
  return name;
}
 
function cleanJUnitFile(filePath) {
  console.log(`Cleaning file: ${filePath}`);
  const xmlContent = fs.readFileSync(filePath, 'utf-8');
  const doc = new DOMParser().parseFromString(xmlContent, 'application/xml');
  const testcases = doc.getElementsByTagName('testcase');
  for (let i = 0; i < testcases.length; i++) {
    const testcase = testcases[i];
    const oldName = testcase.getAttribute('name');
    const newName = cleanTestCaseName(oldName);
    if (oldName !== newName) {
      console.log(`Renaming:\n  FROM: "${oldName}"\n  TO:   "${newName}"`);
      testcase.setAttribute('name', newName);
    }
  }
  const cleanedXml = new XMLSerializer().serializeToString(doc);
  fs.writeFileSync(filePath, cleanedXml, 'utf-8');
  console.log(`JUnit test case names cleaned successfully.`);
}
 
cleanJUnitFile(REPORT_PATH);
# redux-diff
Redux simple diff example http://react-redux-diff.herokuapp.com/

The result of program is show the difference between the files. The format of result is shown below.
For example:

## File1
Some
<br />
<br />

Simple 

Text 

File

## File2

Another
<br />
<br />

Text

File

With

Additional

Lines

## The result of program should look like this:

1. '*'	Some|Another
2. '-'	Simple
3.		Text
4.		File
5.	'+'	With
6.	'+'	Additional
7.	'+'	Lines

## The first column shows line number.
## The second column shows:
1.  '*' in case if line has changed
2. '–' in case line exists in the first file but does not exist in the second one 
3. '+' in case line does not exist in the first file but exists in the second one
4. Nothing if line has not changed.

## The third column shows:

## If line has changed, it shows text in the following format:
1. Line content from the first file | line content from the second file
2. If line exists in the first file but is missing in the second file – show the line content
3. If the line is added in the second file – show the line content

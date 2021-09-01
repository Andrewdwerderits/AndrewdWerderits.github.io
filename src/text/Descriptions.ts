export const PageDescription = `This is a website I created to generate random drum patterns using Typescript. 
The primary purpose was to give myself ideas for patterns to practice on the drums and to spur a bit of
creativity on days I'm feeling uninspired. This page will generate a random drum pattern in musical notation (for those unfamiliar
with drum notation, the bottom row represents the Kick or Bass drum, and the middle row represents the Snare Drum. The funky
squiggles represent rests (no drum is hit at that time). This page allows the user to put constraints on the patterns generated to allow
for incorporation of general ideas. For example, many modern drum beats incorporate a "Backbeat", which is characterized by snare
hits on the 2 and 4 of a measure in 4/4 time. This page allows you to add that constraint to the patterns generated so that
every pattern will include a backbeat. I've also included a playback option to all the patterns generated so that you can hear 
what it sounds like. Adjusting the BPM (Beats Per Minute) will allow you to adjust the playback speed. Higher is faster.
For simplicity's sake, this page only supports linear drum patterns (drum patterns with only one 
drum being hit at a time). However, I decided to add a toggle that will playback a hi-hat on the 8th notes to allow your 
patterns to sound like they have a bit more of a non-linear "Drum Beat" sound to them. You can save your current drum pattern,
so that you can continue to look at it and play it back. However, I haven't implemented any type of local storage yet, so your
patterns will disappear when you refresh the page. I recommend experimenting with generating
beats and messing around with the constraints and playback if this description seems unclear. Happy Drumming!
`;

export const MandatoryNotePlacementDescription = `Adds a constraint that a specified drum hit must occur in the given
location in the measure. The measure is represented as sixteen note placements, each represented with a slide toggle. 
The patterns in this application are linear, so two drums cannot be hit at the same time. For example, You cannot place a kick and snare at the same time.
The exception to this rule is an accent, because an accent is a modifier to make another drum sound louder. 
You may place an accent at the same time as other type, but it will currently only display for a snare hit. You will be
unable to generate your pattern if you specify more total notes in this section than are allowed in the "Total Number of Notes"
section, and you will be unable to generate your pattern if you specify more consecutive notes than are allowed in the 
"Consecutive Notes" section.`;


export const MandatoryNoteMusicalHelp = `In case you are unfamiliar with musical notation, in 4/4 time (only currently supported time signature) a measure is divided into 4
equal sections, or "beats". Each beat is further subdivided into 4 equal sections: Beat#, E, AND(&), A. Each division of the
beat is counted before moving on to the next beat. That would mean that "1" is the 1st location, "1A" is the 4th, "3" is the 9th, etc.
This application only supports subdivisions that can be represented as 16th notes (note: even 
subdivisions longer than 16th notes are supported because you cannot hold a note on a drum, 
so a quarter note is represented as a sixteenth note followed by three 16th note rests).`;

export const ConsecutiveNoteDescription = `Specifies the maximum number of a particular sound that can be played in a row.
For example, specifying "2 Kicks" will disable any pattern containing 3 or more consecutive kick drum notes from being generated.
This will not allow a pattern to be generated if it conflicts with what you have specified in the "Hit Placement" section (i.e. 
you have specified "2 Kicks" as your maximum consecutive note count, and have also
toggled on the kick to appear on beats 1, 1E, 1&). This will not allow a pattern to be generated if it conflicts
with the "Total Number of Notes" section (i.e. You have 16 kicks, which is every single note in the measure, selected as the
Total Number of Notes but have less than 16 as the maximum number of consecutive kicks)`;

export const ExactNumberNoteDescription = `Specifies the exact number of a particular sound that will appear in the generated
pattern. For example, specifying "5 Kicks" will disable any pattern containing 4 or less, as well as 6 or more total kick drums.
This setting can be disabled with a toggle switch, meaning the selected value is ignored if the switch is set to "off". This
will not allow a pattern to be generated if it conflicts with what you have specified in the "Hit Placement" section (i.e. you
have specified "2 kicks" as your Total Number of Notes, and have also toggled on the kick to appear on beats 2, 3, 4). This
will not allow a pattern to be generated if it conflicts with what you have specified in the Consecutive Notes section (i. e.
You have 16 kicks, which is every single note in the measure, selected as the Total Number of Notes but have less than 16 as the 
maximum number of consecutive kicks)`;

export const StickingDescription = `More of a usage for drummers working on hand exercises, there is an option to allow for
the generated pattern to specify if a snare hit should be performed with the left hand or the right hand. None means that
no hand suggestion is provided. Alternate sticking means that every snare hit should alternate between right and left, 
regardless of what is in the middle. Natural sticking means that every snare hit should be the right hand if it is in an
odd location in the measure (beats and &'s) while the left hand should be used for even locations in the measure (E's and A's)
Finally, random will fill in the values randomly, and will follow the rules you specify for each hand in the Consecutive Notes section`;

const MODULES = [
{
    id:1,
    title:"Java Basics & Data Types",
    priority:"High",
    color:"orange",
    icon:"fa-code",

    sections:[
        {
            name:"Program Structure",
            topics:[
                "Class Structure",
                "main() Method",
                "Packages",
                "Imports",
                "Compilation Process",
                "Classpath Basics"
            ]
        },
        {
            name:"Variables",
            topics:[
                "Local Variables",
                "Instance Variables",
                "Static Variables",
                "Final Variables",
                "Initialization Rules",
                "Scope & Lifetime"
            ]
        },
        {
            name:"Primitive Types",
            topics:[
                "byte",
                "short",
                "int",
                "long",
                "float",
                "double",
                "char",
                "boolean"
            ]
        },
        {
            name:"Operators",
            topics:[
                "Arithmetic Operators",
                "Assignment Operators",
                "Unary Operators",
                "Binary Operators",
                "Logical Operators",
                "Relational Operators",
                "Ternary Operator"
            ]
        }
    ],

    traps:[
        "Integer overflow confusion",
        "Pre/post increment mistakes",
        "Implicit casting pitfalls",
        "Operator precedence errors",
        "Wrapper null unboxing"
    ]
},

{
    id:2,
    title:"Strings & StringBuilder",
    priority:"High",
    color:"orange",
    icon:"fa-font",

    sections:[
        {
            name:"String Basics",
            topics:[
                "String Pool",
                "Immutability",
                "Heap vs Pool",
                "Literal vs new String()",
                "String Comparison"
            ]
        },
        {
            name:"String Methods",
            topics:[
                "substring()",
                "indexOf()",
                "replace()",
                "contains()",
                "trim()",
                "strip()",
                "repeat()",
                "isBlank()"
            ]
        },
        {
            name:"StringBuilder",
            topics:[
                "append()",
                "insert()",
                "delete()",
                "replace()",
                "reverse()",
                "capacity()"
            ]
        }
    ],

    traps:[
        "== vs equals() confusion",
        "String immutability misunderstanding",
        "trim() vs strip() confusion",
        "StringBuilder mutability traps"
    ]
},

{
    id:3,
    title:"Date & Time API",
    priority:"Medium-High",
    color:"green",
    icon:"fa-clock",

    sections:[
        {
            name:"Core Classes",
            topics:[
                "LocalDate",
                "LocalTime",
                "LocalDateTime",
                "Instant",
                "Duration",
                "Period"
            ]
        },
        {
            name:"Formatting",
            topics:[
                "DateTimeFormatter",
                "parse()",
                "format()",
                "Pattern Formatting",
                "Localized Formatting"
            ]
        }
    ],

    traps:[
        "Invalid date values",
        "Formatter case sensitivity",
        "Date immutability confusion"
    ]
},

{
    id:4,
    title:"Control Flow",
    priority:"High",
    color:"orange",
    icon:"fa-code-branch",

    sections:[
        {
            name:"Conditionals",
            topics:[
                "if",
                "if-else",
                "nested if",
                "ternary operator"
            ]
        },
        {
            name:"Loops",
            topics:[
                "for loop",
                "while loop",
                "do while",
                "enhanced for loop",
                "nested loops"
            ]
        },
        {
            name:"Switch",
            topics:[
                "Traditional switch",
                "Switch Expressions",
                "yield",
                "Arrow Syntax"
            ]
        }
    ],

    traps:[
        "Infinite loop bugs",
        "Switch fallthrough mistakes",
        "break vs continue confusion"
    ]
},

{
    id:5,
    title:"Object-Oriented Programming",
    priority:"Very High",
    color:"red",
    icon:"fa-cubes",

    sections:[
        {
            name:"Classes & Objects",
            topics:[
                "Object Creation",
                "Constructors",
                "Reference Variables",
                "Garbage Collection"
            ]
        },
        {
            name:"Inheritance",
            topics:[
                "extends",
                "super",
                "Method Overriding",
                "Polymorphism",
                "Upcasting",
                "Downcasting"
            ]
        },
        {
            name:"Abstraction",
            topics:[
                "Abstract Classes",
                "Interfaces",
                "Default Methods",
                "Functional Interfaces"
            ]
        }
    ],

    traps:[
        "Constructor chaining mistakes",
        "Overriding vs overloading",
        "Polymorphic reference confusion"
    ]
},

{
    id:6,
    title:"Exception Handling",
    priority:"High",
    color:"orange",
    icon:"fa-triangle-exclamation",

    sections:[
        {
            name:"Basics",
            topics:[
                "try",
                "catch",
                "finally",
                "throw",
                "throws"
            ]
        },
        {
            name:"Advanced",
            topics:[
                "Multi-catch",
                "try-with-resources",
                "AutoCloseable",
                "Custom Exceptions"
            ]
        }
    ],

    traps:[
        "Catch ordering issue",
        "finally return behavior",
        "Checked vs unchecked confusion"
    ]
},

{
    id:7,
    title:"Arrays & Collections",
    priority:"Very High",
    color:"red",
    icon:"fa-table",

    sections:[
        {
            name:"Arrays",
            topics:[
                "1D Arrays",
                "2D Arrays",
                "Arrays.sort()",
                "binarySearch()"
            ]
        },
        {
            name:"Collections",
            topics:[
                "ArrayList",
                "LinkedList",
                "HashSet",
                "TreeSet",
                "HashMap",
                "TreeMap"
            ]
        }
    ],

    traps:[
        "HashSet ordering assumption",
        "List.of() immutability",
        "Comparator confusion"
    ]
},

{
    id:8,
    title:"Streams & Lambdas",
    priority:"Very High",
    color:"red",
    icon:"fa-water",

    sections:[
        {
            name:"Functional Interfaces",
            topics:[
                "Predicate",
                "Consumer",
                "Supplier",
                "Function"
            ]
        },
        {
            name:"Streams",
            topics:[
                "filter()",
                "map()",
                "flatMap()",
                "sorted()",
                "collect()",
                "reduce()"
            ]
        }
    ],

    traps:[
        "Consumed streams",
        "Lazy evaluation confusion",
        "Infinite stream mistakes"
    ]
},

{
    id:9,
    title:"Modules & Deployment",
    priority:"Medium",
    color:"blue",
    icon:"fa-box",

    sections:[
        {
            name:"Modules",
            topics:[
                "module-info.java",
                "requires",
                "exports",
                "services"
            ]
        }
    ],

    traps:[
        "Module visibility confusion"
    ]
},

{
    id:10,
    title:"Concurrency",
    priority:"Medium-High",
    color:"green",
    icon:"fa-microchip",

    sections:[
        {
            name:"Threads",
            topics:[
                "Runnable",
                "Callable",
                "Thread Lifecycle"
            ]
        },
        {
            name:"Executors",
            topics:[
                "ExecutorService",
                "Future",
                "Scheduled Executors"
            ]
        }
    ],

    traps:[
        "Race conditions",
        "Deadlocks",
        "Shared mutable state"
    ]
},

{
    id:11,
    title:"Java I/O & NIO",
    priority:"Medium",
    color:"blue",
    icon:"fa-folder",

    sections:[
        {
            name:"I/O",
            topics:[
                "Byte Streams",
                "Character Streams",
                "Buffered Streams"
            ]
        },
        {
            name:"NIO",
            topics:[
                "Path",
                "Files",
                "copy()",
                "move()"
            ]
        }
    ],

    traps:[
        "File closing issue",
        "Path confusion"
    ]
},

{
    id:12,
    title:"JDBC",
    priority:"Medium",
    color:"blue",
    icon:"fa-database",

    sections:[
        {
            name:"Core JDBC",
            topics:[
                "DriverManager",
                "Connection",
                "Statement",
                "PreparedStatement",
                "ResultSet"
            ]
        }
    ],

    traps:[
        "SQL Injection",
        "Connection leaks"
    ]
},

{
    id:13,
    title:"Localization",
    priority:"Medium",
    color:"blue",
    icon:"fa-globe",

    sections:[
        {
            name:"Localization",
            topics:[
                "Locale",
                "ResourceBundle",
                "Formatting"
            ]
        }
    ],

    traps:[
        "Locale mismatch"
    ]
},

{
    id:14,
    title:"Logging & Annotations",
    priority:"Low-Medium",
    color:"blue",
    icon:"fa-file-lines",

    sections:[
        {
            name:"Logging",
            topics:[
                "Logger",
                "Handlers",
                "Log Levels"
            ]
        },
        {
            name:"Annotations",
            topics:[
                "@Override",
                "@Deprecated",
                "@FunctionalInterface"
            ]
        }
    ],

    traps:[
        "@Override misuse"
    ]
},

{
    id:15,
    title:"Generics",
    priority:"High",
    color:"orange",
    icon:"fa-layer-group",

    sections:[
        {
            name:"Generics Basics",
            topics:[
                "Generic Classes",
                "Generic Methods",
                "Type Inference"
            ]
        },
        {
            name:"Wildcards",
            topics:[
                "? extends",
                "? super",
                "PECS Principle"
            ]
        }
    ],

    traps:[
        "Type erasure",
        "Wildcard confusion",
        "Heap pollution"
    ]
}
];
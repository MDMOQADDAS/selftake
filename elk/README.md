Note: 

logstash.conf file <br/>
`
input {
  file {
    path => "/path/to/test.log" # Update this path to the location of your test.log file
    start_position => "beginning"
    sincedb_path => "/dev/null"
  }
}

filter {
  grok {
    match => { "message" => "%{TIMESTAMP_ISO8601:timestamp} %{NUMBER:pid} %{LOGLEVEL:loglevel} %{WORD:module} %{GREEDYDATA:message}" }
  }

  date {
    match => [ "timestamp", "yyyy-MM-dd HH:mm:ss,SSS" ]
    target => "@timestamp"
  }
}

output {
  stdout { codec => rubydebug }

  elasticsearch {
    hosts => ["localhost:9200"] # Update Elasticsearch host and port if needed
    index => "test-%{+YYYY.MM.dd}"
  }
}

`
</br>
/tmp/test.log

docker run --name elasticsearch --net elastic -p 9200:9200 -p 9300:9300 -e "discovery.type=single-node" elasticsearch:7.16.2 

docker run -d --name my-logstash --mount type=bind,source=/home/kali/ws/elk/logstash.conf,target=/usr/share/logstash/config/test.conf,readonly -p 9600:9600  -v /home/kali/ws/elk:/tmp --net elastic  logstash:7.16.2   -f /usr/share/logstash/config/test.conf

docker run -d --name my-kibana  --link elasticsearch:elasticsearch  -p 5601:5601  kibana:7.16.2 


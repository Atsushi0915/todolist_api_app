10.times do |i|
  task = Task.new(
    title: "task_title_#{i}",
    content: "task_content_#{i}_####################"
  )
  task.save!
end

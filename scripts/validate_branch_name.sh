#!/usr/bin/env bash
local_branch_name="$(git rev-parse --abbrev-ref HEAD)"

valid_branch_regex='^((feature|feedback|hotfix|revert|reset|force|refactor|fix)\((auth|container|about|dashboard)\)/[a-zA-Z0-9\-]+)$'

message="Branch không đúng rule: VD: fix(auth)/branch_name"

if [[ ! $local_branch_name =~ $valid_branch_regex ]]; then
    echo "$message"
    exit 1
fi

exit 0

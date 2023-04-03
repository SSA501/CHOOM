package com.choom.domain.user.entity;

import org.springframework.data.repository.CrudRepository;

public interface BlacklistRedisRepository extends CrudRepository<Blacklist, String> {
}
